import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FormattedMessage } from 'react-intl';

import { isAuthorize, isAuthorizeMultiRoles } from 'common/src/hoc/authorize';
import Roles from 'common/src/roles_mapping/roles';

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

// Used Mainly For Labs. Added for Portal Menu Authorization
const Menu = (props: MenuPropsType) => {
  //Use to check if child has valid role
  function checkChildHasValidRole(children: any, deprecated = false): boolean {
    let isValid = false;
    for (const value of children) {
      if (value?.role && value?.role.length > 0) {
        //Shallow copy of 1 level
        const roleTobeChecked = value.role.slice();
        if (isAuthorizeMultiRoles(roleTobeChecked, deprecated)) {
          isValid = true;
          break;
          //return aValue;
        }
      }
    }
    return isValid;
  }

  const { backgroundTheme, menuList, textTheme = '', ...rest } = props;
  return (
    <AntdMenu data-testid="custom-menu" {...rest}>
      {menuList.map(
        ({
          children,
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
            if (role.length > 0 && !isAuthorizeMultiRoles(role, deprecated))
              return null;
          }

          if (icon && iconType == 'font-awesome') {
            image = (
              <FontAwesomeIcon className={textTheme} icon={icon as IconProp} />
            );
          } else if (icon) {
            image = Icon({ type: icon, textTheme });
          }

          if (children) {
            const hasValidChild = checkChildHasValidRole(children, deprecated);
            {
              return hasValidChild === true ? (
                <AntdMenu.SubMenu
                  className={textTheme}
                  key={name}
                  icon={image}
                  title={displayName}
                >
                  {children.map(
                    ({
                      link,
                      icon,
                      name,
                      state,
                      role,
                      deprecated = false,
                    }: any) => {
                      const displayName = <FormattedMessage id={name} />;
                      let image: any;
                      if (role.length > 0) {
                        const roleTobeChecked = role.slice();
                        if (
                          !isAuthorizeMultiRoles(roleTobeChecked, deprecated)
                        ) {
                          return null;
                        }
                      }
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
                    }
                  )}
                </AntdMenu.SubMenu>
              ) : null;
            }
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
