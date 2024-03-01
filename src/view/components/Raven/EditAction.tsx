import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Select, Input, Modal, Popconfirm } from 'antd';
import { Button } from '../Button';
import './Raven.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useNavigate, useParams } from 'react-router-dom';
import LinkedNodes from './LinkedNodes';
import {
  fetchRavenRootNodes,
  updateNodeEvent,
} from 'src/store/actions/ravenRootNodeEvents';
import CheckBoxFields from './CheckBoxFields';
import {
  getEditNodeDetails,
  getLinkedNodeDetails,
  getUpdateSuccess,
} from 'src/store/selectors/editAction';
import { getAccessToken } from 'src/store/selectors/accessToken';
import {
  getRavenMetaInfo,
  getTicketOption,
} from 'src/store/selectors/createAction';
import ravenConstants from 'src/common/constants/ravenConstants';
import { toast } from 'react-toastify';

const EditAction = () => {
  /*
   Redux Selectors for fetching data
  */
  const nodeToEdit = useSelector((state: RootState) =>
    getEditNodeDetails(state)
  );
  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const linkedNodes = useSelector((state: RootState) =>
    getLinkedNodeDetails(state)
  );
  const ticketPriorityObjects: Array<any> = useSelector((state: RootState) =>
    getTicketOption(state)
  );
  const ravenMetaInfo = useSelector((state: RootState) =>
    getRavenMetaInfo(state)
  );
  const updateSuccess = useSelector((state: RootState) =>
    getUpdateSuccess(state)
  );

  const dispatch = useDispatch();

  const [isPreview, setIsPreview] = useState(false);
  const [optionalFields, setOptionalFields] = useState<Array<string>>([]);
  const [requiredFields, setRequiredFields] = useState<Array<string>>([]);
  const [showLinkedNodeModal, setShowLinkedNodeModal] = useState(false);
  const editActionInputState = {
    nodeName: '',
    headerName: '',
    screenText: '',
    responseText: '',
    type: '',
    ticketPriority: '',
  };

  /*
  React reducer for managing inputState
  */

  const editActionReducer = (state = editActionInputState, action: any) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        return { ...state, ...action.payload };
    }
  };
  const [editState, editDispatch] = useReducer(
    editActionReducer,
    editActionInputState
  );

  useEffect(() => {
    if (updateSuccess === true) {
      dispatch(fetchRavenRootNodes(accessToken, 200, 0));
      navigate('/communication/raven', { replace: true });
    }
  }, [updateSuccess]);

  /*
   Function for update input field
  */
  const updateInputField = (event: any, inputField: string) => {
    setIsPreview(false);
    const payload: { [key: string]: string } = {};
    payload[inputField] = event.target.value.trim();
    editDispatch({
      type: 'INPUT_CHANGE',
      payload: payload,
    });
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (nodeToEdit === null || nodeToEdit?.id !== id) {
      navigate('/communication/raven', { replace: true });
    } else {
      const updatePayload = {
        nodeName: nodeToEdit?.name ? nodeToEdit?.name : '',
        headerName: nodeToEdit?.header ? nodeToEdit?.header : '',
        screenText: nodeToEdit?.screen_text ? nodeToEdit?.screen_text : '',
        responseText: nodeToEdit?.response ? nodeToEdit?.response : '',
        type: nodeToEdit?.type ? nodeToEdit.type : '',
        ticketPriority: nodeToEdit?.ticket
          ? [nodeToEdit.ticket.status, nodeToEdit.ticket.priority].join('_')
          : '',
      };
      editDispatch({
        type: 'INPUT_CHANGE',
        payload: updatePayload,
      });
      const optionalFields = nodeToEdit?.optional_fields
        ? [...nodeToEdit.optional_fields]
        : [];
      const requiredFields = nodeToEdit?.required_fields
        ? [...nodeToEdit.required_fields]
        : [];
      setOptionalFields(optionalFields);
      setRequiredFields(requiredFields);
    }
  }, [nodeToEdit]);

  /*
   Function for validate data in form
  */

  const validateData = (payload: any): [boolean, null | object] => {
    let error = false;
    const submitData = { ...payload };
    if (submitData.type === 'INFO' || submitData.type === 'WEBVIEW') {
      submitData.optional_fields = null;
      submitData.required_fields = null;
      if (submitData.screenText === '' || submitData.screenText === null) {
        toast.error(ravenConstants.INFO_WEBVIEW_CHECK);
        error = true;
      }
    }
    /**
     * type and response can't be empty
     * checkes for node action on type basis
     * if type === FORM or INFO_WITH_WRITE_TO_US
     * then one field must be selected from Optional/Required Fields
     */
    if (!submitData.node_action && submitData.name !== '') {
      return [false, submitData];
    } else if (
      submitData.node_id.slice(0, 2) === '1.' &&
      ((submitData.required_fields &&
        (submitData.required_fields.indexOf('attachments') > -1 ||
          submitData.required_fields.indexOf('skus') > -1)) ||
        (submitData.optional_fields &&
          submitData.optional_fields.indexOf('attachments') > -1))
    ) {
      toast.error(ravenConstants.GENERIC_NODE_CHECK);
      error = true;
    } else if (
      submitData.type !== '' &&
      submitData.response !== '' &&
      submitData.name !== ''
    ) {
      if (
        submitData.type === 'FORM' ||
        submitData.type === 'INFO_WITH_WRITE_TO_US'
      ) {
        let fieldsLength = 0;
        if (submitData.optional_fields !== null) {
          fieldsLength += submitData.optional_fields.length;
        }
        if (submitData.required_fields !== null) {
          fieldsLength += submitData.required_fields.length;
        }
        if (fieldsLength === 0) {
          toast.error(ravenConstants.FIELDS_LENGTH_CHECK);
          error = true;
        }
        if (
          submitData.required_fields &&
          submitData.required_fields.indexOf('skus') > -1 &&
          fieldsLength !== 3
        ) {
          toast.error(ravenConstants.SKU_TYPE_CHECK);
          error = true;
        } else if (
          ((submitData.required_fields &&
            submitData.required_fields.indexOf('attachments') > -1) ||
            (submitData.optional_fields &&
              submitData.optional_fields.indexOf('attachments') > -1)) &&
          fieldsLength !== 3
        ) {
          toast.error(ravenConstants.ATTACHMENT_TYPE_CHECK);
          error = true;
        } else {
          return [error, submitData];
        }
      }
    } else {
      toast.error(ravenConstants.NAME_TYPE_CHECK);
      error = true;
    }
    return [error, submitData];
  };

  const submitUpdateData = () => {
    const payload: { [k: string]: any } = {
      header: editState.headerName.trim(),
      name: editState.nodeName.trim(),
      node_action: nodeToEdit.node_action,
      node_id: String(nodeToEdit.id),
      optional_fields: optionalFields,
      required_fields: requiredFields,
      response:
        editState.responseText.length <= 1 ? null : editState.responseText,
      screen_text:
        editState.screenText.length <= 1 ? null : editState.screenText,
      type: nodeToEdit.type,
    };
    if (nodeToEdit.ticket !== null && nodeToEdit.ticket.id !== '') {
      payload.ticket_id = nodeToEdit.ticket.id;
    }
    const [error, data] = validateData(payload);
    if (error === false && data !== null) {
      dispatch(updateNodeEvent(accessToken, data));
    }
  };

  const { Option } = Select;

  /*
   Function for Optional field update
  */

  const optionalFieldUpdate = (fieldValue: string) => {
    if (optionalFields.includes(fieldValue)) {
      const newArr = [...optionalFields];
      const index = newArr.indexOf(fieldValue);
      newArr.splice(index, 1);
      setOptionalFields(newArr);
    } else {
      setOptionalFields([fieldValue, ...optionalFields]);
    }
  };

  /*
   Function for required field update
  */
  const requiredFieldUpdate = (fieldValue: string) => {
    if (requiredFields.includes(fieldValue)) {
      const newArr = [...requiredFields];
      const index = newArr.indexOf(fieldValue);
      newArr.splice(index, 1);
      setRequiredFields(newArr);
    } else {
      setRequiredFields([fieldValue, ...requiredFields]);
    }
  };

  const intl = useIntl();

  const { TextArea } = Input;
  return (
    <Fragment>
      <div className="raven-wrapper">
        <div className="mx-auto wallet-wrapper raven-wrap shadow-md">
          <h2 className="text-lg font-semibold raven-form-title text-center py-1">
            <FormattedMessage id="edit_action_form" />
          </h2>
          <div className="py-2 px-3 flex-col flex">
            <div className="flex  mb-3 gap-4">
              <div className="input-label flex-1">
                <Modal
                  title={'Linked Nodes'}
                  visible={showLinkedNodeModal}
                  onCancel={() => setShowLinkedNodeModal(false)}
                  cancelText="Close"
                  okButtonProps={{ style: { display: 'none' } }}
                >
                  <LinkedNodes nodes={linkedNodes} />
                </Modal>
                <span className="text-sm font-semibold">
                  <FormattedMessage id="node_name" />
                  <span className="px-1">:</span>
                </span>
                <span>
                  <Input
                    className={
                      'custom-input  focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6  rounded-md py-1 px-1.5  shadow-sm'
                    }
                    placeholder={intl.formatMessage({ id: 'node_name' })}
                    type="text"
                    data-testid="editNodeName"
                    value={editState.nodeName}
                    onChange={(e) => updateInputField(e, 'nodeName')}
                  />
                </span>
                <div className="no-character px-1.5">
                  {editState.nodeName?.trim().length > 0 && (
                    <span className="character">
                      <span className="text-sm font-semibold">
                        <FormattedMessage id="no_of_characters" />
                      </span>{' '}
                      <span className="px-1">:</span>{' '}
                      {editState.nodeName.trim().length}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="header_name" />
                  <span className="px-1">:</span>
                </span>
                <span>
                  <Input
                    className={
                      'custom-input  focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6  rounded-md py-1 px-1.5  shadow-sm'
                    }
                    placeholder={intl.formatMessage({ id: 'header_name' })}
                    type="text"
                    data-testid="headerName"
                    value={editState.headerName}
                    onChange={(e) => updateInputField(e, 'headerName')}
                  />
                  <div className="no-character px-1.5">
                    {editState.headerName?.trim().length > 0 && (
                      <span className="character">
                        <span className="text-sm font-semibold">
                          <FormattedMessage id="no_of_characters" />
                        </span>{' '}
                        <span className="px-1">:</span>{' '}
                        {editState.headerName.trim().length}
                      </span>
                    )}
                  </div>
                </span>
              </div>
            </div>
            <div className="flex mb-3 gap-4">
              <div className="input-label flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="type_details" />
                  <span className="px-1">:</span>
                </span>
                <span>
                  <Select
                    placeholder={intl.formatMessage({ id: 'select_type' })}
                    className="w-full"
                    value={editState.type}
                    onChange={(value: string) => {
                      setIsPreview(false);
                      editDispatch({
                        type: 'INPUT_CHANGE',
                        payload: { type: value },
                      });
                      // Set Ticket Priority To None
                      editDispatch({
                        type: 'INPUT_CHANGE',
                        payload: { ticketPriority: '' },
                      });
                    }}
                  >
                    {ravenMetaInfo &&
                      ravenMetaInfo.type.map((type: any) => (
                        <Option key={type.id} value={type.type}>
                          {type.type}
                        </Option>
                      ))}
                  </Select>
                </span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="ticket_priorty" />
                  <span className="px-1">:</span>
                </span>
                <span>
                  <Select
                    placeholder={intl.formatMessage({
                      id: 'select_ticket_priority',
                    })}
                    className="w-full"
                    value={editState.ticketPriority}
                    onChange={(value: string) => {
                      setIsPreview(false);
                      editDispatch({
                        type: 'INPUT_CHANGE',
                        payload: { ticketPriority: value },
                      });
                    }}
                  >
                    <Option key={0} value={''}>
                      None Priority
                    </Option>
                    {ticketPriorityObjects &&
                      ticketPriorityObjects.map((obj) => (
                        <Option
                          key={obj.id}
                          value={obj.status + '_' + obj.priority}
                        >
                          {obj.status + '_' + obj.priority}
                        </Option>
                      ))}
                  </Select>
                </span>
              </div>
            </div>
            <div className="flex mb-3 flex-col mt-3 gap-4">
              <div className="input-label flex-1">
                <span className="text-sm font-semibold mr-2">
                  <FormattedMessage id="optional_fields" />
                  <span className="px-1">:</span>
                  {ravenMetaInfo &&
                    ravenMetaInfo.fields.map((nodeActionFields: any) => (
                      <CheckBoxFields
                        key={nodeActionFields.id}
                        changeFunction={optionalFieldUpdate}
                        name={'optional_fields'}
                        id={nodeActionFields.id}
                        fields={nodeActionFields.fields}
                        checkedField={optionalFields}
                        disabledField={requiredFields}
                        isFieldChecked={false}
                        skusCheck={
                          nodeActionFields.fields === 'skus' ? true : false
                        }
                      />
                    ))}
                </span>
                <span></span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold mr-2">
                  <FormattedMessage id="required_fields" />
                  <span className="px-1">:</span>
                  {ravenMetaInfo &&
                    ravenMetaInfo.fields.map((nodeActionFields: any) => (
                      <CheckBoxFields
                        key={nodeActionFields.id}
                        changeFunction={requiredFieldUpdate}
                        name={'required_fields'}
                        id={nodeActionFields.id}
                        fields={nodeActionFields.fields}
                        checkedField={requiredFields}
                        disabledField={optionalFields}
                        isFieldChecked={false}
                        skusCheck={false}
                      />
                    ))}
                </span>
                <span></span>
              </div>
            </div>
            <div className="flex mb-3 flex-col gap-4">
              <div className="input-label flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="screen_text" />
                  <span className="px-1">:</span>
                </span>
                <span>
                  <TextArea
                    rows={4}
                    placeholder={
                      '<b>Mandatory Details</b><br>1. Image of product to indicate products name, MRP, manufacturing date and batch number<br>2. Image of the bill sent by partner pharmacy'
                    }
                    value={editState.screenText}
                    onChange={(e) => updateInputField(e, 'screenText')}
                  />
                  <div className="no-character">
                    {editState.screenText &&
                      editState.screenText?.length > 0 && (
                        <span className="character">
                          <span className="text-sm font-semibold">
                            <FormattedMessage id="no_of_characters" />
                          </span>{' '}
                          <span className="px-1">:</span>
                          {editState.screenText.length}
                        </span>
                      )}
                    {isPreview && editState.screenText?.length > 0 && (
                      <div
                        className="screen-test"
                        dangerouslySetInnerHTML={{
                          __html: editState.screenText,
                        }}
                      />
                    )}
                  </div>
                </span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="response_text" />
                  <span className="px-1">:</span>
                </span>
                <span>
                  <TextArea
                    rows={4}
                    placeholder={`<b>Thank you!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.`}
                    value={editState.responseText}
                    onChange={(e) => updateInputField(e, 'responseText')}
                  />
                  <div className="no-character">
                    {editState.responseText !== null &&
                      editState.responseText?.length > 0 && (
                        <span className="character">
                          <span className="text-sm font-semibold">
                            <FormattedMessage id="no_of_characters" />
                          </span>{' '}
                          <span className="px-1">:</span>
                          {editState.responseText.length}
                        </span>
                      )}
                  </div>
                  {isPreview && editState.responseText?.length > 0 && (
                    <div
                      className="screen-test"
                      dangerouslySetInnerHTML={{
                        __html: editState.responseText,
                      }}
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                className="mr-1.5"
                onClick={() =>
                  navigate('/communication/raven', { replace: true })
                }
              >
                <FormattedMessage id="back" />
              </Button>
              {linkedNodes && linkedNodes?.length > 1 && (
                <div className="mr-1.5">
                  <Button onClick={() => setShowLinkedNodeModal(true)}>
                    <FormattedMessage id="linked_nodes" />
                  </Button>
                </div>
              )}
              {!isPreview ? (
                <Button className="" onClick={() => setIsPreview(true)}>
                  <FormattedMessage id="preview" />
                </Button>
              ) : (
                <Popconfirm
                  className="popconfrim"
                  title="Are you sure？"
                  onConfirm={() => submitUpdateData()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    className=""
                    disabled={
                      editState.nodeName.length < 1 ||
                      editState.headerName.length < 1 ||
                      editState.type === null
                    }
                  >
                    <FormattedMessage id="update" />
                  </Button>
                </Popconfirm>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditAction;
