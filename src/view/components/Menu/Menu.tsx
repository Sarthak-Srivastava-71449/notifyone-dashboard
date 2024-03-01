import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FormattedMessage } from 'react-intl';

import { isAuthorize } from 'src/common/hoc/authorize';
import Roles from 'src/common/roles_mapping/roles';

interface MenuPropsType {
  backgroundTheme?: string;
  className?: string;
  defaultSelectedKeys?: string[];
  menuList: any[];
  mode?: 'horizontal' | 'vertical' | 'inline';
  onClick: (event: any) => void;
  selectedKeys?: string[];
  textTheme?: string;
  theme?: 'light' | 'dark';
}

const Icon = ({ type, textTheme, ...rest }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const icons = require(`@ant-design/icons`);
  const Component = icons[type];

  return (
    <Component
      className={'inline-flex text-sm ' + textTheme}
      style={{ display: 'inline-flex' }}
      {...rest}
    />
  );
};

const Menu = (props: MenuPropsType) => {
  const { backgroundTheme, menuList, textTheme = '', ...rest } = props;

  return (
    <AntdMenu data-testid="custom-menu" {...rest}>
      {menuList.map(
        ({
          items,
          link,
          icon,
          name,
          key = '',
          iconType,
          role,
          deprecated = false,
        }: any) => {
          const displayName = <FormattedMessage id={name} />;
          let image: any;

          if (role && !isAuthorize(Roles[role], deprecated)) {
            return null;
          }

          if (icon && iconType == 'font-awesome') {
            image = (
              <FontAwesomeIcon className={textTheme} icon={icon as IconProp} />
            );
          } else if (icon) {
            image = Icon({ type: icon, textTheme });
          }

          if (items) {
            return (
              <AntdMenu.SubMenu
                className={textTheme}
                key={name}
                icon={image}
                title={displayName}
              >
                {items.map(({ link, icon, name, state }: any) => {
                  const displayName = <FormattedMessage id={name} />;
                  let image: any;

                  if (icon) {
                    image = Icon({ type: icon });
                  }

                  if (link) {
                    return (
                      <AntdMenu.Item
                        className={backgroundTheme}
                        key={name}
                        icon={image}
                      >
                        <Link className={textTheme} to={link} state={state}>
                          {displayName}
                        </Link>
                      </AntdMenu.Item>
                    );
                  }

                  return (
                    <AntdMenu.Item
                      className={textTheme + ' ' + backgroundTheme}
                      icon={image}
                      key={name}
                    >
                      {displayName}
                    </AntdMenu.Item>
                  );
                })}
              </AntdMenu.SubMenu>
            );
          }

          if (link) {
            return (
              <AntdMenu.Item
                key={name}
                icon={image}
                className={backgroundTheme}
              >
                <Link className={textTheme} to={link}>
                  {displayName}
                </Link>
              </AntdMenu.Item>
            );
          }

          return (
            <AntdMenu.Item
              className={textTheme + ' ' + backgroundTheme}
              key={name}
              icon={image}
            >
              {displayName}
            </AntdMenu.Item>
          );
        }
      )}
    </AntdMenu>
  );
};

export default Menu;
