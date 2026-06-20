import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Text } from "@mantine/core";
import cx from "clsx";

import classes from "./DndListHandle.module.css";

function SortableItem({ item, renderItem, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
 <div
  ref={setNodeRef}
  style={style}
  className={cx(classes.item, {
    [classes.itemDragging]: isDragging,
  })}
  {...attributes}
  {...listeners}
>
  {renderItem ? renderItem(item) : <Text>{item.name}</Text>}
  <div className="ml-auto">
  <ActionIcon
    color="red"
    variant="subtle"
    onClick={(e) => {
      e.stopPropagation(); 
      onRemove?.(item.id);
    }}
  >
   
     <IconTrash size={16}   />
   
  </ActionIcon>
  </div>
</div>
  );
}

export default function DndList({
  items = [],
  onChange,
  renderItem,
  onRemove
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = items.findIndex(
      (item) => item.id === over.id
    );

    onChange?.(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            item={item}
            renderItem={renderItem}
             onRemove={onRemove}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}