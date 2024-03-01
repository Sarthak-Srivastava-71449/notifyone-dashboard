import { Row, Col, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { COMS_TEMPLATE_NAVIGATE } from 'src/common/constants';
import { RootState } from 'src/store';
import Fuse from 'fuse.js';
import { fetchEmailEventDetails } from 'src/store/actions/emailEvents';
import { getAccessToken } from 'src/store/selectors/accessToken';
import { Button } from '../Button';
import { fetchSmsEventDetails } from 'src/store/actions/smsEvents';
import { fetchWhatsappEventDetails } from 'src/store/actions/whatsappEvents';
import { fetchPushNotificationEventDetails } from 'src/store/actions/pushNotificationEvents';
import { addToCurrentEvent } from 'src/store/actions/currentEvents';

const SearchField = ({ type }: { type: string }) => {
  const dispatch = useDispatch();
  const [eventType, setEventType] = useState(type);
  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const email_id_templates = useSelector(
    (state: RootState) => state.emailEvents.email_id_templates
  );
  const sms_id_templates = useSelector(
    (state: RootState) => state.smsEvents.sms_id_templates
  );
  const whatsapp_id_templates = useSelector(
    (state: RootState) => state.whatsAppEvents.whatsapp_id_templates
  );
  const push_id_notifications = useSelector(
    (state: RootState) => state.pushNotificationEvents.push_id_notifications
  );

  useEffect(() => {
    switch (type) {
      case 'email':
        setEventType('email');
        if (email_id_templates && email_id_templates.length < 1) {
          dispatch(fetchEmailEventDetails(accessToken, type));
        }
        break;
      case 'sms':
        setEventType('sms');
        if (sms_id_templates && sms_id_templates.length < 1) {
          dispatch(fetchSmsEventDetails(accessToken, type));
        }
        break;
      case 'whatsapp':
        setEventType('whatsapp');
        if (whatsapp_id_templates && whatsapp_id_templates.length < 1) {
          dispatch(fetchWhatsappEventDetails(accessToken, type));
        }
        break;
      case 'transactional push notification':
        setEventType('transaction');
        if (push_id_notifications && push_id_notifications.length < 1) {
          dispatch(fetchPushNotificationEventDetails(accessToken, 'push'));
        }
        break;
    }
  }, [type]);
  const [searchFilterText, setSearchFilterText] = useState('');
  const [filteredEventsList, setFilteredEventsList] = useState<any[]>([]);
  const intl = useIntl();

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim();
    setSearchFilterText(searchValue);
    const performFuzzySearch = () => {
      let result: object[] = [];
      const options = {
        shouldSort: true,
        includeScore: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: ['event_name'],
      };

      if (searchValue !== '') {
        let templates = [];
        switch (type) {
          case 'email':
            templates = email_id_templates;
            break;
          case 'sms':
            templates = sms_id_templates;
            break;
          case 'whatsapp':
            templates = whatsapp_id_templates;
            break;
          case 'transactional push notification':
            templates = push_id_notifications;
            break;
        }
        const fuse = new Fuse(templates, options);
        result = fuse.search(searchValue);
      }

      return result;
    };
    const filteredEvents = performFuzzySearch().map((match: any) => match.item);
    setFilteredEventsList(filteredEvents);
  };

  return (
    <div className="email-btn">
      <Row
        className="mt-1 mb-4 flex-col relative"
        justify="center"
        align="middle"
      >
        <Col className="list-search">
          <Input.Search
            className="w-full"
            allowClear={false}
            placeholder={intl.formatMessage({ id: 'search' })}
            onChange={onSearch}
            value={searchFilterText}
          />
          <Button
            className="ml-2"
            onClick={() => {
              setSearchFilterText('');
              setFilteredEventsList([]);
            }}
          >
            <FormattedMessage id="reset" />
          </Button>
        </Col>
        <ul
          className={`flex w-6/12 justify-center ${
            filteredEventsList.length >= 1 ? 'search-link-wrapper' : ''
          }   overflow-auto flex-col`}
        >
          <div className="search-content">
            {filteredEventsList.length >= 1 &&
              filteredEventsList.map((item: any) => (
                <li className="search-list" key={item.id}>
                  <Link
                    key={item.id + 1}
                    to={{
                      pathname: `${COMS_TEMPLATE_NAVIGATE}/${eventType}/${item.event_id}`,
                    }}
                    onClick={() => dispatch(addToCurrentEvent(item))}
                    target="_blank"
                    className="text-blue-500 hover:text-blue-800 py-1.5 px-3"
                  >
                    {item.event_name}
                  </Link>
                </li>
              ))}
          </div>
        </ul>
      </Row>
    </div>
  );
};

export default SearchField;
