import React, { Fragment, useEffect, useState } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import {
  Col,
  Divider,
  Input,
  Row,
  Select,
  Modal,
  Switch,
  Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, ButtonType } from '../Button';

import {
  COMMUNICATION_TYPE,
  COMS_TEMPLATE_NAVIGATE,
  MAX_INPUT_LIMIT,
} from 'src/common/constants';
import { previewSmsEvent, updateSmsEvent } from 'src/store/actions/smsEvents';
import {
  previewPushNotificationEvent,
  updatePushNotificationEvent,
} from 'src/store/actions/pushNotificationEvents';
import { updateWhatsAppEvent } from 'src/store/actions/whatsappEvents';
import {
  clearEmailTemplate,
  fetchSingleEmailEvent,
  previewEmailEvent,
  previewEmailTemplate,
  updateEmailEvent,
} from 'src/store/actions/emailEvents';
import { RootState } from 'src/store';
import { regExp } from './utils';
import { commonEventDetailType } from '../types';
import {
  detailHeaderType,
  payloadPreviewLabelType,
  previewClassNames,
  previewHeaderClassNames,
} from './constants';
import { Spinner } from '../Spinner';
import authPermissionHandler from 'src/common/authPermission/authPermissions';
import rightConstants from 'src/common/constants/rightConstants';
import appNames from 'src/common/constants/appNames';
import {
  removeToCurrentEvent,
  updateToggleActionForSingleEvent,
} from 'src/store/actions/currentEvents';
import jwtDecode from 'jwt-decode';

const { Option } = Select;

interface CommunicationTemplateProps {
  eventDetails: commonEventDetailType;
  setEventDetails: React.Dispatch<React.SetStateAction<commonEventDetailType>>;
  shouldDisable: boolean;
}

const CommunicationTemplate: React.FC<CommunicationTemplateProps> = ({
  eventDetails,
  setEventDetails,
  shouldDisable,
}) => {
  const intl = useIntl();
  const [payloads, setPayloads] = useState<any[]>([]);
  const [preview, setPreview] = useState('');
  const [templatePreview, setTemplatePreview] = useState('');
  const [previewHeader, setPreviewHeader] = useState('');
  const [shouldShowPreview, setShouldShowPreview] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state: RootState) => state?.user?.tokens?.accessToken
  );
  const loadingEmailPreview = useSelector(
    (state: RootState) => state.emailEvents?.loadingPreview
  );
  const loadingSmsPreview = useSelector(
    (state: RootState) => state.smsEvents?.loadingPreview
  );
  const loadingPushNotificationPreview = useSelector(
    (state: RootState) => state.pushNotificationEvents?.loadingPreview
  );
  const emailPreview = useSelector(
    (state: RootState) => state.emailEvents?.email_previews
  );
  const smsPreview = useSelector(
    (state: RootState) => state.smsEvents?.sms_previews
  );
  const pushNotificationPreview = useSelector(
    (state: RootState) =>
      state.pushNotificationEvents?.push_notification_previews
  );
  const emailError = useSelector(
    (state: RootState) => state.emailEvents?.error
  );
  const smsError = useSelector((state: RootState) => state.smsEvents?.error);
  const pushNotificationError = useSelector(
    (state: RootState) => state.pushNotificationEvents?.error
  );
  const includedTemplatePreview = useSelector(
    (state: RootState) => state.emailEvents?.included_previews[0]
  );
  const selectIncludedTemplate = useSelector(
    (state: RootState) => state?.emailEvents?.included_templates[0]
  );
  const userRoles = useSelector((state: RootState) => state.user.roles);

  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (
      eventDetails.event_type !== COMMUNICATION_TYPE.Email &&
      eventDetails.title
    ) {
      return setPreviewHeader(eventDetails?.title);
    }

    setPreviewHeader('');
  }, [eventDetails.subject]);

  useEffect(() => {
    // This is to set the preview returned from api call, and show that to the user
    if (
      eventDetails.event_type === COMMUNICATION_TYPE.Email &&
      eventDetails.event_text &&
      emailPreview
    ) {
      setPreviewHeader(emailPreview?.subject);
      setPreview(emailPreview?.content);
    }
    if (
      eventDetails.event_type === COMMUNICATION_TYPE.SMS &&
      eventDetails.event_text &&
      smsPreview
    ) {
      setPreview(smsPreview);
    }
    if (
      eventDetails.event_type ===
        COMMUNICATION_TYPE.Transactional_Push_notification &&
      eventDetails.event_text &&
      pushNotificationPreview
    ) {
      setPreviewHeader(pushNotificationPreview?.title);
      setPreview(pushNotificationPreview?.body);
    }
  }, [emailPreview, smsPreview, pushNotificationPreview]);

  useEffect(() => {
    // This use effect is which extracts the payload keys from the content or event_text,
    // and displays them in the json box for user to update/modify
    setShouldShowPreview(false);
    if (eventDetails?.data && Object.keys(eventDetails?.data).length) {
      setPayloads(eventDetails?.data);
    } else {
      const allPayloadsFromEvent = eventDetails.event_text
        ? eventDetails?.event_text?.toString().match(regExp)
        : [];

      const mergePayload = (target: any, source: any) => {
        for (const key of Object.keys(source)) {
          if (source[key] instanceof Object && key in target)
            Object.assign(source[key], mergePayload(target[key], source[key]));
        }

        Object.assign(target || {}, source);
        return target;
      };

      const mergedPayload = allPayloadsFromEvent?.length
        ? allPayloadsFromEvent?.reduce((mergedPayload: any, payload: any) => {
            payload = payload.split('|')[0];
            const label = payload.replace(/[{{}}]/g, '');
            const labels = label.split('.');
            const labelPayload = labels.reduceRight((obj: any, next: any) => {
              return { [next]: obj };
            }, '');

            return mergePayload(labelPayload, mergedPayload);
          }, {})
        : {};

      setPayloads(mergedPayload);
    }
  }, [eventDetails.event_text, eventDetails?.data]);

  useEffect(() => {
    if (selectIncludedTemplate) {
      return setShowModal(true);
    }

    setShowModal(false);
  }, [selectIncludedTemplate]);

  useEffect(() => {
    if (selectIncludedTemplate && selectIncludedTemplate?.content) {
      setTemplatePreview(emailPreview?.content);
    }

    setTemplatePreview('');
  }, [includedTemplatePreview]);

  const showHTMLType = eventDetails.event_type === COMMUNICATION_TYPE.Email;
  const showPushNotificationType =
    eventDetails.event_type ==
    COMMUNICATION_TYPE.Transactional_Push_notification;

  const onTemplateTextUpdate = (event: any) => {
    setEventDetails({
      ...eventDetails,
      event_text: event.target.value,
    });
  };

  const onPayloadValueUpdate = (updatedPayload: any) => {
    if (updatedPayload && Object.keys(updatedPayload).length) {
      setPayloads(updatedPayload);
    }
  };

  const onSaveTemplate = () => {
    let redirect = '';
    if (eventDetails.event_type === COMMUNICATION_TYPE.SMS) {
      redirect = '/sms';
      dispatch(
        updateSmsEvent(
          eventDetails,
          jwtDecode(accessToken),
          payloads,
          redirect,
          navigate
        )
      );
    }

    if (
      eventDetails.event_type ==
      COMMUNICATION_TYPE.Transactional_Push_notification
    ) {
      redirect = '/transaction';
      dispatch(
        updatePushNotificationEvent(
          eventDetails,
          jwtDecode(accessToken),
          payloads,
          redirect,
          navigate
        )
      );
    }

    if (eventDetails.event_type === COMMUNICATION_TYPE.Email) {
      redirect = '/email';
      dispatch(
        updateEmailEvent(
          eventDetails,
          jwtDecode(accessToken),
          payloads,
          redirect,
          navigate
        )
      );
    }

    if (eventDetails.event_type === COMMUNICATION_TYPE.Whatsapp) {
      redirect = '/whatsapp';
      dispatch(
        updateWhatsAppEvent(
          eventDetails,
          jwtDecode(accessToken),
          payloads,
          redirect,
          navigate
        )
      );
    }
  };

  const detailsHeader = () => {
    if (showHTMLType) {
      return intl.formatMessage({
        id: detailHeaderType.content,
      });
    }

    if (showPushNotificationType) {
      return intl.formatMessage({
        id: detailHeaderType.message,
      });
    }

    return intl.formatMessage({
      id: detailHeaderType.eventText,
    });
  };

  const getPayloadPreviewLabel = () => {
    if (
      shouldShowPreview &&
      (eventDetails.event_type === COMMUNICATION_TYPE.Email ||
        payloads?.length === 0)
    ) {
      return payloadPreviewLabelType.preview;
    }

    if (shouldShowPreview && payloads?.length > 0) {
      return payloadPreviewLabelType.payloadNPreview;
    }

    return payloadPreviewLabelType.payloads;
  };

  const getPreviewHeaderClassName = () => {
    if (
      (showHTMLType && !preview) ||
      (!showHTMLType && !eventDetails.event_text)
    ) {
      return previewHeaderClassNames.class1;
    }
    return previewHeaderClassNames.class2 + 'divToPrint';
  };

  const getPreviewClassName = () => {
    if (showHTMLType) {
      return previewClassNames.class1;
    }

    return previewClassNames.class2;
  };

  const updateEventDetails = (type: string, name: string, event: any) => {
    if (type == 'option') {
      return setEventDetails({
        ...eventDetails,
        [name]: event,
      });
    }

    return setEventDetails({
      ...eventDetails,
      [name]: event.target.value,
    });
  };

  const onPreview = () => {
    if (!eventDetails.event_text) {
      toast.error(`${detailsHeader()} is empty`);
      return setShouldShowPreview(false);
    }

    if (eventDetails.event_type === COMMUNICATION_TYPE.Email) {
      dispatch(
        previewEmailEvent(eventDetails, jwtDecode(accessToken), payloads)
      );
    }
    if (eventDetails.event_type === COMMUNICATION_TYPE.SMS) {
      dispatch(previewSmsEvent(eventDetails, jwtDecode(accessToken), payloads));
    }
    if (
      eventDetails.event_type ===
      COMMUNICATION_TYPE.Transactional_Push_notification
    ) {
      dispatch(
        previewPushNotificationEvent(
          eventDetails,
          jwtDecode(accessToken),
          payloads
        )
      );
    }

    setShouldShowPreview(true);
  };

  const onClearTemplate = () => {
    let redirect = '';
    if (eventDetails.event_type === COMMUNICATION_TYPE.SMS) {
      redirect = '/sms';
    }

    if (
      eventDetails.event_type ==
      COMMUNICATION_TYPE.Transactional_Push_notification
    ) {
      redirect = '/transaction';
    }

    if (eventDetails.event_type === COMMUNICATION_TYPE.Email) {
      redirect = '/email';
    }

    if (eventDetails.event_type === COMMUNICATION_TYPE.Whatsapp) {
      redirect = '/whatsapp';
    }

    dispatch(removeToCurrentEvent());
    navigate(`/communication/templates${redirect}`);
  };

  const onInclude = (option: any) => {
    return dispatch(fetchSingleEmailEvent(accessToken, option));
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(clearEmailTemplate());
  };

  const onPreviewEmailTemplate = () => {
    dispatch(previewEmailTemplate(selectIncludedTemplate, accessToken));
  };

  function printPdf() {
    const input = document.getElementById('divToPrint');
    // Add allowTaint when working in production
    // Set logging true when you need logs ⬇️
    html2canvas(input, { useCORS: true }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      // Custom Image Config -> x = -30, y = 0, width = 270, height = 250
      pdf.addImage(imgData, 'JPEG', -30, 0, 270, 250);
      // pdf.output('dataurlnewwindow');
      pdf.save('preview.pdf');
    });
  }

  const updateTogglePayload = () => {
    let t;
    switch (eventDetails.event_type) {
      case COMMUNICATION_TYPE.SMS:
        t = 'sms';
        break;
      case COMMUNICATION_TYPE.Email:
        t = 'email';
        break;
      case COMMUNICATION_TYPE.Whatsapp:
        t = 'whatsapp';
        break;
      case COMMUNICATION_TYPE.Transactional_Push_notification:
        t = 'push';
        break;
    }
    const payload = {
      actions: eventDetails.actions === 1 ? 0 : 1,
      app_name: eventDetails.app_name,
      event_name: eventDetails.event_name,
      type: t,
    };
    dispatch(updateToggleActionForSingleEvent(accessToken, payload));
  };

  return (
    <div className="px-10 py-10">
      <Row gutter={[16, 10]}>
        <Col xs={12} sm={12} md={4}>
          <span className="required">
            <FormattedMessage id="type" />
          </span>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Select
            defaultValue={COMMUNICATION_TYPE.SMS}
            disabled={shouldDisable}
            onChange={(option) =>
              updateEventDetails('option', 'event_type', option)
            }
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value={eventDetails.event_type || COMMUNICATION_TYPE.SMS}
          >
            <Option value={COMMUNICATION_TYPE.SMS}>
              {COMMUNICATION_TYPE.SMS}
            </Option>
            <Option value={COMMUNICATION_TYPE.Whatsapp}>
              {COMMUNICATION_TYPE.Whatsapp}
            </Option>
            <Option value={COMMUNICATION_TYPE.Transactional_Push_notification}>
              {COMMUNICATION_TYPE.Transactional_Push_notification}
            </Option>
            <Option value={COMMUNICATION_TYPE.Email}>
              {COMMUNICATION_TYPE.Email}
            </Option>
          </Select>
        </Col>
        <Col xs={12} sm={12} md={4}>
          <span className="required">
            <FormattedMessage id="event_name" />
          </span>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Input
            placeholder={intl.formatMessage({ id: 'enter_event_name' })}
            maxLength={MAX_INPUT_LIMIT}
            value={eventDetails.event_name}
            onChange={(event) =>
              updateEventDetails('input', 'event_name', event)
            }
            disabled={shouldDisable}
          />
        </Col>
        <Col xs={12} sm={12} md={4}>
          <span className="required">
            <FormattedMessage id="application_name" />
          </span>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Input
            placeholder={intl.formatMessage({ id: 'enter_application_name' })}
            maxLength={MAX_INPUT_LIMIT}
            value={eventDetails.app_name}
            onChange={(event) => updateEventDetails('input', 'app_name', event)}
            disabled={shouldDisable}
          />
        </Col>
        <Col xs={12} sm={12} md={4}>
          <span className="required">
            <FormattedMessage id="enabled" />
          </span>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Popconfirm
            className="popconfrim"
            title="Are you sure？"
            onConfirm={() => updateTogglePayload()}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checked={eventDetails.actions === 1 ? true : false}
              className="bg-app-theme"
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </Popconfirm>
        </Col>
        <Col xs={12} sm={12} md={4}>
          <span className="required">
            <FormattedMessage id="trigger_limit" />
          </span>
        </Col>
        <Col xs={12} sm={12} md={8}>
          <Input
            type="number"
            onKeyDown={(e) =>
              ['e', 'E', '+'].includes(e.key) && e.preventDefault()
            }
            placeholder={intl.formatMessage({ id: 'enter_trigger_limit' })}
            maxLength={MAX_INPUT_LIMIT}
            pattern="[+-]?\d+(?:[.,]\d+)?"
            value={eventDetails.triggers_limit}
            onChange={(event) =>
              updateEventDetails('input', 'triggers_limit', event)
            }
          />
        </Col>
        {showHTMLType && (
          <>
            <Col xs={12} sm={12} md={4}>
              <FormattedMessage id="description" />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                placeholder={intl.formatMessage({ id: 'enter_description' })}
                value={eventDetails.description}
                onChange={(event) =>
                  updateEventDetails('input', 'description', event)
                }
              />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <span className="required">
                <FormattedMessage id="subject" />
              </span>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                placeholder={intl.formatMessage({ id: 'enter_subject' })}
                value={eventDetails.subject}
                onChange={(event) =>
                  updateEventDetails('input', 'subject', event)
                }
              />
            </Col>
          </>
        )}
        {showPushNotificationType && (
          <>
            <Col xs={12} sm={12} md={4}>
              <span className="required">
                <FormattedMessage id="title" />
              </span>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                placeholder={intl.formatMessage({ id: 'enter_title' })}
                maxLength={MAX_INPUT_LIMIT}
                value={eventDetails.title}
                onChange={(event) =>
                  updateEventDetails('input', 'title', event)
                }
              />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <span className="required">
                <FormattedMessage id="image" />
              </span>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                placeholder={intl.formatMessage({ id: 'enter_image_url' })}
                maxLength={MAX_INPUT_LIMIT}
                value={eventDetails.image}
                onChange={(event) =>
                  updateEventDetails('input', 'image', event)
                }
              />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <span className="required">
                <FormattedMessage id="target" />
              </span>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Select
                style={{ minWidth: '100%', maxWidth: '100%' }}
                value={eventDetails.target}
                onChange={(option) =>
                  updateEventDetails('option', 'target', option)
                }
              >
                <Option value={'SELECT_TARGET'}>{'SELECT_TARGET'}</Option>
                <Option value={'UPLOAD PRESCRIPTION'}>
                  {'UPLOAD PRESCRIPTION'}
                </Option>
                <Option value={'WEB NPS'}>{'WEB NPS'}</Option>
                <Option value={'DYNAMIC TARGET'}>{'DYNAMIC TARGET'}</Option>
                <Option value={'PRESCRIPTION DETAIL'}>
                  {'PRESCRIPTION DETAIL'}
                </Option>
                <Option value={'ORDER HISTORY'}>{'ORDER HISTORY'}</Option>
                <Option value={'TRACK ORDER'}>{'TRACK ORDER'}</Option>
              </Select>
            </Col>
          </>
        )}
        {eventDetails &&
          eventDetails.event_type === COMMUNICATION_TYPE.Email && (
            <>
              <Col xs={12} sm={12} md={4}>
                <FormattedMessage id="select_include" />
              </Col>
              <Col xs={12} sm={12} md={8}>
                <Select
                  defaultValue="Select include"
                  style={{ minWidth: '100%', maxWidth: '100%' }}
                  disabled={false}
                  onChange={onInclude}
                >
                  {eventDetails.includes?.map((include: any) => {
                    return (
                      <Option key={include.id} value={include.id}>
                        {include.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </>
          )}
      </Row>
      <Row className="mt-4">
        <Col span={4}>
          <span className="required">{detailsHeader()}</span>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={24}>
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 10 }}
            onChange={onTemplateTextUpdate}
            placeholder={intl.formatMessage({
              id: 'event_text_or_content',
            })}
            value={eventDetails.event_text}
            showCount
          />
        </Col>
      </Row>
      {Object.keys(payloads).length > 0 && (
        <>
          <Divider />
          <Row className="pt-2" gutter={[16, 10]}>
            <Col className="text-left" span={24}>
              {getPayloadPreviewLabel()}
            </Col>
          </Row>
          <Row className="my-4">
            <Col span={24}>
              <Editor
                value={payloads}
                onChange={(updatedJson: any) =>
                  onPayloadValueUpdate(updatedJson)
                }
                mode="code"
              />
            </Col>
          </Row>
        </>
      )}
      {eventDetails.event_type !== COMMUNICATION_TYPE.Whatsapp && (
        <Row className="pt-8" justify="end">
          <Col>
            <Button
              className="min-w-[120px]"
              data-testid="preview-event-button"
              onClick={onPreview}
              type={ButtonType.Primary}
            >
              <FormattedMessage id="preview" />
            </Button>
          </Col>
        </Row>
      )}
      {loadingEmailPreview ||
      loadingSmsPreview ||
      loadingPushNotificationPreview ? (
        <Spinner
          loading={
            loadingEmailPreview ||
            loadingSmsPreview ||
            loadingPushNotificationPreview
          }
        />
      ) : (
        shouldShowPreview && (
          <Row className="pt-7 text-right">
            {eventDetails.event_type !== COMMUNICATION_TYPE.Email ? (
              !pushNotificationError &&
              !smsError && (
                <Col span={24}>
                  <div
                    ref={ref}
                    id="divToPrint"
                    className={getPreviewHeaderClassName()}
                  >
                    {preview && previewHeader && (
                      <div
                        className="text-center px-2 py-2 text-lg mx-auto"
                        dangerouslySetInnerHTML={{
                          __html: previewHeader,
                        }}
                      />
                    )}
                    <div
                      className={getPreviewClassName()}
                      dangerouslySetInnerHTML={{
                        __html: preview,
                      }}
                    />
                  </div>
                  <span>{!showHTMLType && preview?.length}</span>
                </Col>
              )
            ) : (
              <Fragment>
                {emailError === '' && emailPreview && (
                  <Col span={24}>
                    <div
                      ref={ref}
                      id="divToPrint"
                      className={getPreviewHeaderClassName()}
                    >
                      {showHTMLType && preview && (
                        <div
                          className="text-center px-2 py-2 text-lg mx-auto"
                          dangerouslySetInnerHTML={{
                            __html: previewHeader,
                          }}
                        />
                      )}
                      <div
                        className={getPreviewClassName()}
                        dangerouslySetInnerHTML={{
                          __html: preview,
                        }}
                      />
                    </div>
                    <span>{!showHTMLType && preview?.length}</span>
                  </Col>
                )}
              </Fragment>
            )}
          </Row>
        )
      )}
      {authPermissionHandler(
        userRoles,
        appNames.LARA,
        rightConstants.UPDATE
      ) && (
        <Row className="pt-10" justify="space-around">
          {showHTMLType && emailError === '' && emailPreview && (
            <Col>
              {
                <Button
                  className="min-w-[120px]"
                  disabled={!shouldShowPreview}
                  onClick={() => printPdf()}
                  type={ButtonType.Primary}
                >
                  <FormattedMessage id="generate_pdf" />
                </Button>
              }
            </Col>
          )}
          {
            <Col>
              <Button
                className="min-w-[120px]"
                data-testid="save-event-details-button"
                onClick={onSaveTemplate}
                disabled={
                  eventDetails.event_type === COMMUNICATION_TYPE.Whatsapp
                    ? false
                    : preview?.length
                    ? false
                    : true
                }
                type={ButtonType.Primary}
              >
                <FormattedMessage id="save" />
              </Button>
            </Col>
          }
          <Col>
            <Button
              className="min-w-[120px]"
              data-testid="reset-event-details-button"
              onClick={onClearTemplate}
              type={ButtonType.Danger}
            >
              <FormattedMessage id="cancel" />
            </Button>
          </Col>
        </Row>
      )}
      {selectIncludedTemplate && (
        <Modal
          title="Modal"
          centered
          visible={showModal}
          onCancel={closeModal}
          width={700}
          footer={
            <Row gutter={[16, 10]} align="middle" justify="end">
              <Col span={4}>
                <Button
                  className="min-w-[84px]"
                  onClick={closeModal}
                  type={ButtonType.Danger}
                >
                  <FormattedMessage id="back" />
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  className="min-w-[84px]"
                  onClick={onPreviewEmailTemplate}
                  type={ButtonType.Primary}
                >
                  <FormattedMessage id="preview" />
                </Button>
              </Col>
            </Row>
          }
        >
          <Row gutter={[16, 10]}>
            <Col xs={12} sm={12} md={4}>
              <FormattedMessage id="name" />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                value={selectIncludedTemplate.name}
                placeholder={'Enter name'}
                maxLength={MAX_INPUT_LIMIT}
              />
            </Col>

            <Col xs={12} sm={12} md={4}>
              <FormattedMessage id="select_include" />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Select
                defaultValue="Select include"
                style={{ minWidth: '100%', maxWidth: '100%' }}
                disabled={selectIncludedTemplate.includes?.length <= 0}
                onChange={onInclude}
              >
                {selectIncludedTemplate.includes?.map((include: any) => {
                  return (
                    <Option key={include.id} value={include.id}>
                      {include.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <FormattedMessage id="description" />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                placeholder={intl.formatMessage({ id: 'enter_description' })}
                value={selectIncludedTemplate.description}
                onChange={(event) =>
                  updateEventDetails('input', 'description', event)
                }
              />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <FormattedMessage id="trigger_limit" />
            </Col>
            <Col xs={12} sm={12} md={8}>
              <Input
                type="number"
                placeholder={intl.formatMessage({ id: 'enter_trigger_limit' })}
                maxLength={MAX_INPUT_LIMIT}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={24}>
              <Input.TextArea
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder={intl.formatMessage({
                  id: 'event_text_or_content',
                })}
                value={selectIncludedTemplate?.content}
                showCount
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: templatePreview,
                }}
              />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default CommunicationTemplate;
