import React from 'react';
import { Table as AntdTable } from 'antd';

interface TablePropsType {
  bordered?: boolean;
  columns: any;
  className?: string;
  dataSource: any;
  onRow?: any;
  pagination?: any;
  rowKey?: any;
  footer?: any;
  rowSelection?: any;
  scroll?: any;
  dataStatus?: any;
}

const Table = (props: TablePropsType) => {
  const {
    bordered = true,
    columns,
    className,
    dataSource,
    pagination,
    footer,
    ...rest
  } = props;

  return (
    <AntdTable
      bordered={bordered}
      columns={columns}
      className={className}
      data-testid="custom-table"
      dataSource={dataSource}
      pagination={pagination}
      footer={footer}
      {...rest}
    />
  );
};

export default Table;
