import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { COMMUNICATION_TYPE } from 'src/common/constants';

import { CommunicationTemplate } from '../CommunicationTemplate';
import { commonEventDetailType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getWhatsAppEvents } from 'src/store/selectors/whatsAppEvents';
import { fetchCurrentEmailEvent } from 'src/store/actions/emailEvents';
import { getAccessToken } from 'src/store/selectors/accessToken';
import { Spinner } from '../Spinner';
import { fetchCurrentSmsEvent } from 'src/store/actions/smsEvents';
import { fetchCurrentPushEvent } from 'src/store/actions/pushNotificationEvents';
import { fetchCurrentWhatsappEvent } from 'src/store/actions/whatsappEvents';

const { Content } = Layout;

const Communication: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentEvent = useSelector(
    (state: RootState) => state.currentEvent.current_event
  );
  const whatsAppEvents = useSelector((state: RootState) =>
    getWhatsAppEvents(state)
  );
  const accessToken = useSelector((state: RootState) => getAccessToken(state));

  const currentEventLoading = useSelector(
    (state: RootState) => state.currentEvent.loading
  );

  const [eventDetails, setEventDetails] = useState<commonEventDetailType>({
    app_name: '',
    event_name: '',
    event_type: '',
    id: '',
    triggers_limit: '',
  });

  const shouldDisable = !!currentEvent;

  useEffect(() => {
    if (!currentEvent) {
      if (
        location.pathname.startsWith('/communication/template/email/') &&
        id
      ) {
        dispatch(fetchCurrentEmailEvent(accessToken, parseInt(id)));
      } else if (
        location.pathname.startsWith('/communication/template/sms/') &&
        id
      ) {
        dispatch(fetchCurrentSmsEvent(accessToken, parseInt(id)));
      } else if (
        location.pathname.startsWith('/communication/template/transaction/') &&
        id
      ) {
        dispatch(fetchCurrentPushEvent(accessToken, parseInt(id)));
      } else if (
        location.pathname.startsWith('/communication/template/whatsapp/') &&
        id
      ) {
        dispatch(fetchCurrentWhatsappEvent(accessToken, parseInt(id)));
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentEvent && currentEvent !== null) {
      const record: any = currentEvent;

      const eventProperties = {
        actions: record?.actions,
        app_name: record?.app_name,
        event_name: record?.event_name,
        event_type: record?.event_type,
        id: record?.id,
        triggers_limit: record?.triggers_limit,
        event_id: record?.event_id,
        data: record?.data,
      };

      if (record.event_type === COMMUNICATION_TYPE.SMS) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.content,
        });
      }

      if (
        record.event_type === COMMUNICATION_TYPE.Transactional_Push_notification
      ) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.body,
          image: record?.image,
          target: record?.target,
          title: record?.title,
          updated: record?.updated,
          updated_by: record?.updated_by,
        });
      }

      if (record.event_type == COMMUNICATION_TYPE.Whatsapp) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.name,
        });
      }

      if (record.event_type == COMMUNICATION_TYPE.Email) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.content,
          description: record?.description,
          includes: record?.includes,
          name: record?.name,
          subject: record?.subject,
          updated_by: record?.updated_by,
        });
      }
    }
  }, [currentEvent, currentEventLoading]);

  return (
    <Layout
      hasSider
      className="max-h-[calc(100vh-50px-50px)] overflow-y-scroll"
    >
      {currentEventLoading ? (
        <Spinner
          className="h-[calc(100vh-48px-50px)]"
          loading={currentEventLoading}
        />
      ) : (
        <Content>
          <CommunicationTemplate
            eventDetails={eventDetails}
            setEventDetails={setEventDetails}
            shouldDisable={shouldDisable}
          />
        </Content>
      )}
    </Layout>
  );
};

export default Communication;
