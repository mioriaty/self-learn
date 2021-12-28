import oops from 'assets/oops.svg';
import { FC, ReactNode } from 'react';
import { Empty } from 'antd';
import { View } from 'core';
import { ActivityIndicator } from 'components/ActivityIndicator';

export interface AsyncComponentProps {
  status: Status;
  Request?: ReactNode;
  Success: ReactNode;
  Failure?: ReactNode;
  Empty?: ReactNode;
  isEmpty?: boolean;
}

const RequestComponent: FC = () => {
  return (
    <View style={{ padding: '100px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

const FailureComponent: FC = () => {
  return (
    <View style={{ maxWidth: '600px', margin: 'auto', padding: '100px 10px' }}>
      <img src={oops} />
    </View>
  );
};

const EmptyComponent: FC = () => {
  return <Empty />;
};

const AsyncComponent: FC<AsyncComponentProps> = ({
  status,
  Request = <RequestComponent />,
  Success,
  Failure = <FailureComponent />,
  Empty = <EmptyComponent />,
  isEmpty = false,
}) => {
  const renderMapping: Record<Status, ReactNode> = {
    idle: null,
    loading: Request,
    success: isEmpty ? Empty : Success,
    failure: Failure,
  };

  return <>{renderMapping[status]}</>;
};

export default AsyncComponent;
