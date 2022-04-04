import Empty from 'components/Empty';
import { FC, ReactNode } from 'react';
import { ActivityIndicator, View } from 'wiloke-react-core';

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
    <View css={{ padding: '80px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

const FailureComponent: FC = () => {
  return <View css={{ maxWidth: '600px', margin: 'auto', padding: '80px 10px' }}>failure</View>;
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
