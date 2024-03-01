import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Select, Input } from 'antd';
import { Button } from '../Button';
import './Raven.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  fetchRavenMetaData,
  fetchRavenTickets,
} from 'src/store/actions/ravenRootNodeEvents';
import {
  addNewNodeAction,
  fetchRavenNodeActions,
} from 'src/store/actions/ravenActionNodeEvents';
import { useNavigate } from 'react-router-dom';
import ravenConstants from 'src/common/constants/ravenConstants';
import { toast } from 'react-toastify';
import CheckBoxFields from './CheckBoxFields';
import {
  getCreateSuccess,
  getRavenMetaInfo,
  getTicketOption,
} from 'src/store/selectors/createAction';
import { getAccessToken } from 'src/store/selectors/accessToken';

const CreateAction: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
    Redux Selectors for fetching data
  */

  const ticketPriorityObjects: Array<any> = useSelector((state: RootState) =>
    getTicketOption(state)
  );
  const ravenMetaInfo = useSelector((state: RootState) =>
    getRavenMetaInfo(state)
  );
  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const createSuccess = useSelector((state: RootState) =>
    getCreateSuccess(state)
  );

  /*
   UseEffect for loading Raven Node Actions Data
  */

  useEffect(() => {
    if (createSuccess === true) {
      dispatch(fetchRavenNodeActions(accessToken, 200, 0));
      navigate('/communication/raven', { replace: true });
    }
  }, [createSuccess]);

  const [optionalFields, setOptionalFields] = useState<Array<string>>([]);
  const [requiredFields, setRequiredFields] = useState<Array<string>>([]);

  /*
   UseEffect for Fetching Raven Meta Data and Ticket Data
 */

  useEffect(() => {
    dispatch(fetchRavenMetaData(accessToken));
    dispatch(fetchRavenTickets(accessToken));
  }, []);

  const [isPreview, setIsPreview] = useState(false);

  const editActionInputState = {
    headerName: '',
    screenText: '',
    responseText:
      '<b>Thank You!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.',
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

  const updateInputField = (event: any, inputField: string) => {
    const payload: { [key: string]: string } = {};
    const input = event?.target?.value;
    payload[inputField] = input;
    setIsPreview(false);
    editDispatch({
      type: 'INPUT_CHANGE',
      payload: payload,
    });
  };

  const { Option } = Select;

  const intl = useIntl();

  const createNewAction = () => {
    const payload = {
      application: 'PHARMACY',
      emails: '',
      event: '',
      header: editState.headerName.trim(),
      optional_fields: optionalFields.length > 0 ? optionalFields : null,
      required_fields: requiredFields.length > 0 ? requiredFields : null,
      response: editState.responseText,
      screen_text: editState.screenText,
      ticket: editState.ticketPriority,
      type: editState.type,
    };
    const [error, data] = validateData(payload);
    if (error === false && data !== null) {
      dispatch(addNewNodeAction(accessToken, data));
    }
  };

  /*
   Function for validate data in form
  */

  const validateData = (payload: any): [boolean, null | object] => {
    let error = false;
    const submitData = { ...payload };
    if (submitData.type === 'INFO' || submitData.type === 'WEBVIEW') {
      submitData.optional_fields = null;
      submitData.required_fields = null;
      if (submitData.screen_text === '' || submitData.screen_text === null) {
        toast.error(ravenConstants.INFO_WEBVIEW_CHECK);
        error = true;
      }
    }
    if (submitData.type !== '' && submitData.response !== '') {
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
        }
      }
    } else {
      toast.error(ravenConstants.NAME_TYPE_CHECK);
      error = true;
    }
    return [error, submitData];
  };

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

  const { TextArea } = Input;
  return (
    <Fragment>
      <div className="raven-wrapper">
        <div className=" mx-auto wallet-wrapper raven-wrap  shadow-md">
          <h2 className="text-lg raven-form-title font-semibold text-center py-1">
            <FormattedMessage id="create_action_form" />
          </h2>
          <div className=" py-2 px-3 flex-col flex">
            <div className="flex mb-3  gap-4">
              <div className="flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="node_action_header" />
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
                  <div className="no-character">
                    {editState?.headerName?.trim().length > 0 && (
                      <span className="character">
                        <span className="text-sm font-semibold">
                          <FormattedMessage id="no_of_characters" />
                        </span>{' '}
                        <span className="px-1">:</span>
                        {editState?.headerName.trim().length}
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
                      ravenMetaInfo?.type?.map((type: any) => (
                        <Option key={type.id} value={type.type}>
                          {type.type}
                        </Option>
                      ))}
                  </Select>
                </span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold ">
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
                      ticketPriorityObjects?.map((obj) => (
                        <Option key={obj?.id} value={obj?.id}>
                          {obj?.status + '_' + obj?.priority}
                        </Option>
                      ))}
                  </Select>
                </span>
              </div>
            </div>
            <div className="flex mb-3 flex-col mt-3 gap-4">
              <div className="input-label flex-1">
                <span className="text-sm font-semibold">
                  <FormattedMessage id="optional_fields" />
                  <span className="px-1">:</span>
                  {ravenMetaInfo &&
                    ravenMetaInfo?.fields?.map((nodeActionFields: any) => (
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
                <span className="text-sm font-semibold">
                  <FormattedMessage id="required_fields" />
                  <span className="px-1">:</span>
                  {ravenMetaInfo &&
                    ravenMetaInfo?.fields?.map((nodeActionFields: any) => (
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
                    placeholder={`<b>Thank you!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.`}
                    value={editState.screenText}
                    onChange={(e) => updateInputField(e, 'screenText')}
                  />
                  <div className="no-character">
                    {editState?.screenText?.length > 0 && (
                      <span className="character">
                        <span className="text-sm font-semibold">
                          <FormattedMessage id="no_of_characters" />
                        </span>{' '}
                        <span className="px-1">:</span>
                        {editState?.screenText?.length}
                      </span>
                    )}
                    {isPreview && editState.screenText.length > 0 && (
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
                    placeholder={`<b>Thank You!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.`}
                    value={editState.responseText}
                    onChange={(e) => updateInputField(e, 'responseText')}
                  />
                  <div className="no-character">
                    {editState?.responseText?.length > 0 && (
                      <span className="character">
                        <span className="text-sm font-semibold">
                          <FormattedMessage id="no_of_characters" />
                        </span>{' '}
                        <span className="px-1">:</span>{' '}
                        {editState?.responseText?.length}
                      </span>
                    )}
                  </div>
                  {isPreview && editState.responseText.length > 0 && (
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
              {!isPreview ? (
                <Button className="" onClick={() => setIsPreview(true)}>
                  <FormattedMessage id="preview" />
                </Button>
              ) : (
                <Button className="" onClick={() => createNewAction()}>
                  <FormattedMessage id="submit" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default CreateAction;
