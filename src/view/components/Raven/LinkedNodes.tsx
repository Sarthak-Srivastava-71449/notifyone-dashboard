import React from 'react';
import './Raven.css';
interface LinkedNodeProps {
  nodes: Array<any>;
}

const LinkedNodes: React.FC<LinkedNodeProps> = (props: LinkedNodeProps) => {
  return (
    <div className="container">
      <div className="popup">
        <div className="wrapper">
          <div className="card">
            <div className="header">Linked of Node IDs</div>
            <div className="row">
              <div className="col-xs-push-6 col-md-push-8">
                {props.nodes.map((linkedNodeDetail) => (
                  <div key={linkedNodeDetail.id} className="text-padding">
                    <span className="linknode-details-id px-1 font-semibold">
                      {linkedNodeDetail.id}.
                    </span>{' '}
                    &nbsp;
                    {linkedNodeDetail.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinkedNodes;
