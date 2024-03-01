import React, { Fragment } from 'react';
import { Select } from 'antd';
import { Col, Row } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { logo } from 'src/assets/image';
import { unifiedAdminCommunicationLogo } from 'src/assets/image/communication';
import LOCALES from 'src/common/i18n/locales';

const { Option } = Select;

const Header = ({ changeLocale, locale, name }: any) => {
  const intl = useIntl();
  const username =
    name && name.lastIndexOf('@')
      ? name.substring(0, name.lastIndexOf('@'))
      : name;

  return (
    <Fragment>
      <Row className="px-2 py-1" align="middle" justify="space-between">
        <Col>
          <Link replace={true} to={'/'}>
            <img
              alt={intl.formatMessage({ id: 'tata_1mg_logo' })}
              data-testid="tata-1mg-logo"
              className="max-h-[40px]"
              src={logo}
              height="40"
            />
          </Link>
        </Col>
        <Col>
          <Link replace={true} to={'/communication'}>
            <img
              className="max-h-[40px] ml-20"
              data-testid="unified-admin-logo"
              src={unifiedAdminCommunicationLogo}
              height="40"
              alt={intl.formatMessage({
                id: 'unified_admin_communication_logo',
              })}
            />
          </Link>
        </Col>
        <Col>
          {name &&
            `${intl.formatMessage({
              id: 'welcome',
            })} ${username}`}
          &nbsp; &nbsp;
          <Select
            data-testid="select-locales"
            defaultValue={LOCALES.ENGLISH}
            onChange={changeLocale}
            value={locale}
          >
            {Object.values(LOCALES).map((key) => (
              <Option data-testid="select-locales-option" key={key} value={key}>
                {key}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Outlet />
    </Fragment>
  );
};

export default Header;
