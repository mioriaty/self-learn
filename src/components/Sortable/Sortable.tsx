import { View } from 'core';
import { CSSProperties, ReactNode } from 'react';
import { DragDropContext, DragDropContextProps, Draggable, DraggableProvidedDragHandleProps, Droppable } from 'react-beautiful-dnd';

interface DataDefault {
  id: string;
}

export interface RenderItemParam<T extends DataDefault> {
  item: T;
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging: boolean;
}

export interface SortableProps<T extends DataDefault> extends Omit<DragDropContextProps, 'children'> {
  data: T[];
  renderItem: ({ item, index, dragHandleProps }: RenderItemParam<T>) => ReactNode;
  keyExtractor?: (item: T) => string;
  itemClassName?: string;
  droppableId?: string;
  type?: string;
}

const Sortable = <T extends { id: string }>({
  data,
  renderItem,
  keyExtractor = item => item.id,
  itemClassName = '',
  droppableId = 'droppable',
  type,
  ...rest
}: SortableProps<T>) => {
  return (
    <DragDropContext {...rest}>
      <Droppable type={type} droppableId={droppableId}>
        {provided => (
          <View {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable key={keyExtractor(item)} draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                  return (
                    <View
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      style={{
                        ...provided.draggableProps.style,
                        ...(!!provided.draggableProps.style?.transform
                          ? { transform: `${provided.draggableProps.style?.transform?.replace(/\(.*,/g, '(0,')}` }
                          : {}),
                      }}
                      className={itemClassName}
                    >
                      {renderItem({ item, index, dragHandleProps: provided.dragHandleProps, isDragging: snapshot.isDragging })}
                    </View>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </View>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Sortable;
