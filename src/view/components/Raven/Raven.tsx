import { Collapse } from 'antd';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../Spinner';
import { RootState } from 'src/store';
import { fetchRavenNodeActions } from 'src/store/actions/ravenActionNodeEvents';
import {
  fetchRavenInactiveNodeLinks,
  fetchRavenNodes,
} from 'src/store/actions/ravenNodeEvents';
import {
  fetchRavenMetaData,
  fetchRavenRootNodes,
  fetchRavenTickets,
} from 'src/store/actions/ravenRootNodeEvents';
import { getAccessToken } from 'src/store/selectors/accessToken';
import {
  getAddNodeSuccess,
  getChangeActionSuccess,
  getLoading,
  getRootNodes,
  getToggleUpdateSuccess,
} from 'src/store/selectors/raven';
import './Raven.css';
import SubNode from './SubNode';

const Raven: React.FC = () => {
  const dispatch = useDispatch();

  /*
  Redux Selectors for fetching data
*/
  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const shouldShowSpinner = useSelector((state: RootState) =>
    getLoading(state)
  );
  const rootNodes = useSelector((state: RootState) => getRootNodes(state));

  const addNodeSuccess = useSelector((state: RootState) =>
    getAddNodeSuccess(state)
  );
  const changeActionSuccess = useSelector((state: RootState) =>
    getChangeActionSuccess(state)
  );
  const toggleUpdateSuccess = useSelector((state: RootState) =>
    getToggleUpdateSuccess(state)
  );
  const updateRankSuccess = useSelector(
    (state: RootState) => state?.ravenRootEventsReducer?.updateRankSuccess
  );
  useEffect(() => {
    dispatch(fetchRavenRootNodes(accessToken, 200, 0));
    dispatch(fetchRavenNodeActions(accessToken, 200, 0));
    dispatch(fetchRavenNodes(accessToken, 200, 0));
    dispatch(fetchRavenInactiveNodeLinks(accessToken));
    dispatch(fetchRavenMetaData(accessToken));
    dispatch(fetchRavenTickets(accessToken));
  }, []);

  useEffect(() => {
    if (
      changeActionSuccess === true ||
      addNodeSuccess === true ||
      toggleUpdateSuccess === true ||
      updateRankSuccess === true
    ) {
      dispatch(fetchRavenRootNodes(accessToken, 200, 0));
      dispatch(fetchRavenInactiveNodeLinks(accessToken));
    }
  }, [
    changeActionSuccess,
    addNodeSuccess,
    toggleUpdateSuccess,
    updateRankSuccess,
  ]);

  const intl = useIntl();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onChange = () => {};

  return shouldShowSpinner ? (
    <Spinner loading={shouldShowSpinner} />
  ) : (
    <div className="raven-wrapper">
      <h2 className="text-lg raven-form-title font-semibold text-center py-1">
        <FormattedMessage id="root_node" />
      </h2>
      {rootNodes?.length > 0 &&
        rootNodes.map((rootNode: any) => (
          <Collapse
            className=""
            // onChange={onChange}
            accordion
            key={rootNode.node_details.id}
          >
            <SubNode nodeSubQuestion={rootNode.node_details} rootNode={true} />
          </Collapse>
        ))}
    </div>
  );
};

export default Raven;
