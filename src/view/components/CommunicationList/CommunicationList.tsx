import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Select } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import rightConstants from 'src/common/constants/rightConstants';
import './communicationList.css';
import { Spinner } from '../Spinner';
import { Table } from '../Table';

import { fetchSmsEvents } from 'src/store/actions/smsEvents';
import { fetchallEmailEvents } from 'src/store/actions/emailEvents';
import { fetchWhatsAppEvents } from 'src/store/actions/whatsappEvents';
import { fetchPushNotificationEvents } from 'src/store/actions/pushNotificationEvents';
import {
  COMMUNICATION_TYPE,
  COMS_TEMPLATE_NAVIGATE,
} from 'src/common/constants';
import { getSmsEvents } from 'src/store/selectors/smsEvents';
import { getEmailEvents } from 'src/store/selectors/emailEvents';
import { getPushNotificationEvents } from 'src/store/selectors/pushNotificationEvents';
import { getWhatsAppEvents } from 'src/store/selectors/whatsAppEvents';
import { isFetchingEvents } from 'src/store/selectors/isFetchingEvents';
import { RootState } from 'src/store';
import authPermissionHandler from 'src/common/authPermission/authPermissions';
import appNames from 'src/common/constants/appNames';
import { commonEventDetailType } from '../types';
import {
  addToCurrentEvent,
  removeToCurrentEvent,
} from 'src/store/actions/currentEvents';
import SearchField from './SearchField';

const { Option } = Select;

const PageSize = 25;

const CommunicationList: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [currentPageSize, setCurrentPageSize] = useState(PageSize);
  const [resetTypeFlag, setResetTypeFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [type, setType] = useState<string>('');

  const columnsForEmail = [
    {
      dataIndex: 'event_name',
      key: 'event_name',
      width: '30%',
      title: intl.formatMessage({ id: 'event_name' }),
      sorter: (record_1: any, record_2: any) =>
        record_1.event_name.localeCompare(record_2.event_name),
    },
    {
      dataIndex: 'subject',
      key: 'subject',
      width: '30%',
      title: intl.formatMessage({ id: 'subject' }),
    },
    {
      dataIndex: 'app_name',
      key: 'app_name',
      width: '30%',
      title: intl.formatMessage({ id: 'application_name' }),
    },
    {
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      title: intl.formatMessage({ id: 'description' }),
    },
  ];

  const columnsForSmsOnly = [
    {
      dataIndex: 'event_name',
      key: 'event_name',
      width: '30%',
      title: intl.formatMessage({ id: 'event_name' }),
      sorter: (record_1: any, record_2: any) =>
        record_1.event_name.localeCompare(record_2.event_name),
    },
    {
      dataIndex: 'app_name',
      key: 'app_name',
      width: '30%',
      title: intl.formatMessage({ id: 'application_name' }),
    },
    {
      dataIndex: 'content',
      key: 'content',
      width: '30%',
      title: intl.formatMessage({ id: 'content' }),
    },
  ];

  const columnsForWhatsappOnly = [
    {
      dataIndex: 'event_name',
      key: 'event_name',
      width: '30%',
      title: intl.formatMessage({ id: 'event_name' }),
      sorter: (record_1: any, record_2: any) =>
        record_1.event_name.localeCompare(record_2.event_name),
    },
    {
      dataIndex: 'app_name',
      key: 'app_name',
      width: '30%',
      title: intl.formatMessage({ id: 'application_name' }),
    },
    {
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      title: intl.formatMessage({ id: 'name' }),
    },
  ];

  const columnsForPushNotificationOnly = [
    {
      dataIndex: 'event_name',
      key: 'event_name',
      width: '30%',
      title: intl.formatMessage({ id: 'event_name' }),
      sorter: (record_1: any, record_2: any) =>
        record_1.event_name.localeCompare(record_2.event_name),
    },
    {
      dataIndex: 'app_name',
      key: 'app_name',
      width: '30%',
      title: intl.formatMessage({ id: 'application_name' }),
    },
    {
      dataIndex: 'title',
      key: 'title',
      title: intl.formatMessage({ id: 'title' }),
    },
  ];

  /*
    Redux Selectors for fetching data
  */
  const accessToken = useSelector(
    (state: RootState) => state?.user?.tokens?.accessToken
  );

  const userRoles = useSelector((state: RootState) => state.user.roles);

  const isLoading = useSelector((state: RootState) => isFetchingEvents(state));
  const emailEvents = useSelector((state: RootState) => getEmailEvents(state));
  const emailTotalCount = useSelector(
    (state: RootState) => state.emailEvents.total_count
  );
  const pushNotificationEvents = useSelector((state: RootState) =>
    getPushNotificationEvents(state)
  );
  const pushTotalCount = useSelector(
    (state: RootState) => state.pushNotificationEvents.total_count
  );
  const smsEvents = useSelector((state: RootState) => getSmsEvents(state));
  const smsTotalCount = useSelector(
    (state: RootState) => state.smsEvents.total_count
  );
  const whatsAppEvents = useSelector((state: RootState) =>
    getWhatsAppEvents(state)
  );
  const whatsappTotalCount = useSelector(
    (state: RootState) => state.whatsAppEvents.total_count
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (type == COMMUNICATION_TYPE.SMS && isLoading.loadingSmsEvents) {
      return setShouldShowSpinner(true);
    } else if (
      type == COMMUNICATION_TYPE.Email &&
      isLoading.loadingEmailEvents
    ) {
      return setShouldShowSpinner(true);
    } else if (
      type == COMMUNICATION_TYPE.Transactional_Push_notification &&
      isLoading.loadingNotificationEvents
    ) {
      return setShouldShowSpinner(true);
    } else if (
      type == COMMUNICATION_TYPE.Whatsapp &&
      isLoading.loadingWhatsAppEvents
    ) {
      return setShouldShowSpinner(true);
    }

    setShouldShowSpinner(false);
  }, [isLoading, type]);

  useEffect(() => {
    const path = location.pathname;
    const lastItem = path.substring(path.lastIndexOf('/') + 1);
    let myType = '';
    if (['sms', 'email', 'transaction', 'whatsapp'].includes(lastItem)) {
      switch (lastItem) {
        case 'sms':
          myType = COMMUNICATION_TYPE.SMS;
          break;
        case 'email':
          myType = COMMUNICATION_TYPE.Email;
          break;
        case 'transaction':
          myType = COMMUNICATION_TYPE.Transactional_Push_notification;
          break;
        case 'whatsapp':
          myType = COMMUNICATION_TYPE.Whatsapp;
          break;
      }
      setType(myType);
    } else {
      setType('');
    }
  }, [location.pathname]);

  useEffect(() => {
    setCurrentPageSize(PageSize);
    setCurrentPage(0);
    setResetTypeFlag(true);
    if (type == COMMUNICATION_TYPE.SMS) {
      navigate('/templates/sms');
      dispatch(fetchSmsEvents(accessToken, PageSize, 0));
    }
    if (type == COMMUNICATION_TYPE.Email) {
      navigate('/templates/email');
      dispatch(fetchallEmailEvents(accessToken, PageSize, 0));
    }
    if (type == COMMUNICATION_TYPE.Transactional_Push_notification) {
      navigate('/templates/transaction');
      dispatch(fetchPushNotificationEvents(accessToken, PageSize, 0));
    }
    if (type == COMMUNICATION_TYPE.Whatsapp) {
      navigate('/templates/whatsapp');
      dispatch(fetchWhatsAppEvents(accessToken, PageSize, 0));
    }
  }, [type]);

  useEffect(() => {
    if (resetTypeFlag === false) {
      if (type === COMMUNICATION_TYPE.SMS) {
        dispatch(
          fetchSmsEvents(accessToken, PageSize, currentPage * currentPageSize)
        );
      }

      if (type === COMMUNICATION_TYPE.Email) {
        dispatch(
          fetchallEmailEvents(
            accessToken,
            PageSize,
            currentPage * currentPageSize
          )
        );
      }

      if (type === COMMUNICATION_TYPE.Transactional_Push_notification) {
        dispatch(
          fetchPushNotificationEvents(
            accessToken,
            PageSize,
            currentPage * currentPageSize
          )
        );
      }

      if (type === COMMUNICATION_TYPE.Whatsapp) {
        dispatch(
          fetchWhatsAppEvents(
            accessToken,
            PageSize,
            currentPage * currentPageSize
          )
        );
      }
    }
  }, [currentPage, currentPageSize]);

  const onTypeChange = (option: any) => setType(option);

  const data = () => {
    if (type === COMMUNICATION_TYPE.SMS) {
      return smsEvents;
    }

    if (type === COMMUNICATION_TYPE.Email) {
      return emailEvents;
    }

    if (type == COMMUNICATION_TYPE.Transactional_Push_notification) {
      return pushNotificationEvents;
    }

    if (type == COMMUNICATION_TYPE.Whatsapp) {
      return whatsAppEvents;
    }
  };

  const columns = () => {
    const baseIdColumn = {
      dataIndex: 'event_id',
      key: 'id',
      title: intl.formatMessage({ id: 'id' }),
      render: (text: string, record: commonEventDetailType) => {
        const className =
          record.actions === 0 ? 'border-red-500' : 'border-green-500';
        return <p className={`border-l-4 pl-4 ${className}`}>{text}</p>;
      },
    };
    const baseEditColumn = {
      key: 'id',
      render: (text: string, record: commonEventDetailType) => {
        let type;
        switch (record.event_type) {
          case COMMUNICATION_TYPE.SMS:
            type = 'sms';
            break;
          case COMMUNICATION_TYPE.Whatsapp:
            type = 'whatsapp';
            break;
          case COMMUNICATION_TYPE.Transactional_Push_notification:
            type = 'transaction';
            break;
          case COMMUNICATION_TYPE.Email:
            type = 'email';
            break;
          default:
            break;
        }
        return authPermissionHandler(
          userRoles,
          appNames.LARA,
          rightConstants.UPDATE
        ) ? (
          <Link
            to={{
              pathname: `${COMS_TEMPLATE_NAVIGATE}/${type}/${record.event_id}`,
            }}
            onClick={() => dispatch(addToCurrentEvent(record))}
            className="text-blue-500 hover:text-blue-800"
          >
            <FormattedMessage id="edit" />
          </Link>
        ) : null;
      },
    };
    let columnType;
    if (type == COMMUNICATION_TYPE.Email) {
      columnType = columnsForEmail;
    } else if (type == COMMUNICATION_TYPE.Transactional_Push_notification) {
      columnType = columnsForPushNotificationOnly;
    } else if (type == COMMUNICATION_TYPE.SMS) {
      columnType = columnsForSmsOnly;
    } else {
      columnType = columnsForWhatsappOnly;
    }

    return [baseIdColumn, ...columnType, baseEditColumn];
  };

  const getTotalCount = () => {
    switch (type) {
      case COMMUNICATION_TYPE.SMS:
        return smsTotalCount;
      case COMMUNICATION_TYPE.Email:
        return emailTotalCount;
      case COMMUNICATION_TYPE.Transactional_Push_notification:
        return pushTotalCount;
      case COMMUNICATION_TYPE.Whatsapp:
        return whatsappTotalCount;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <div className="px-4 pt-4 communication-list-wrap">
        <Row className="mb-4" align="middle" justify="center">
          <Col className="mr-2">
            <FormattedMessage id="type" />
          </Col>
          <Col className="selecter-wrapper">
            <Select className="w-full" value={type} onChange={onTypeChange}>
              <Option
                key={COMMUNICATION_TYPE.SMS}
                value={COMMUNICATION_TYPE.SMS}
              >
                {COMMUNICATION_TYPE.SMS}
              </Option>
              <Option
                key={COMMUNICATION_TYPE.Whatsapp}
                value={COMMUNICATION_TYPE.Whatsapp}
              >
                {COMMUNICATION_TYPE.Whatsapp}
              </Option>
              <Option
                key={COMMUNICATION_TYPE.Transactional_Push_notification}
                value={COMMUNICATION_TYPE.Transactional_Push_notification}
              >
                {COMMUNICATION_TYPE.Transactional_Push_notification}
              </Option>
              <Option
                key={COMMUNICATION_TYPE.Email}
                value={COMMUNICATION_TYPE.Email}
              >
                {COMMUNICATION_TYPE.Email}
              </Option>
            </Select>
          </Col>
        </Row>
        {!!type && (
          <>
            <SearchField type={type.toLowerCase()} />
            {shouldShowSpinner ? (
              <Spinner loading={shouldShowSpinner} />
            ) : (
              <Row>
                <Col span={24}>
                  <Table
                    bordered={true}
                    columns={columns()}
                    dataSource={data()}
                    rowKey={(record: any) => record.id}
                    pagination={{
                      total: getTotalCount(),
                      pageSize: currentPageSize,
                      current: currentPage + 1,
                      showSizeChanger: false,
                      onChange: (page: any, pageSize: any) => {
                        setResetTypeFlag(false);
                        setCurrentPage(page - 1);
                        setCurrentPageSize(pageSize);
                        window.scrollTo(0, 0);
                      },
                    }}
                  />
                </Col>
              </Row>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default CommunicationList;
