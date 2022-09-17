import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store'
import { IIssues } from '../../interfaces/issuses.interface';
import { Card} from '../card/Card';
import './Colum.scss';
import { IKanban } from '../../interfaces/kanban.interface';

export const Column = () => {
  const kanban = useSelector((state: AppState) => state.main.kanban);
  const pathName = useSelector((state: AppState)=> state.main.pathName);
  const [data, setData] = useState<IKanban[]>([]);

  useEffect(()=>{
    setData(kanban)
  }, [kanban, data])

  const onDragEnd = (result: any) => {
  
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex(e => e.id.toString() === source.droppableId.toString())
      const destinationColIndex = data.findIndex(e => e.id.toString() === destination.droppableId.toString())
     
      const sourceCol = data[sourceColIndex]
      const destinationCol = data[destinationColIndex]

      const sourceTask = [...sourceCol.issues]
      const destinationTask = [...destinationCol.issues]

      const [removed] = sourceTask.splice(source.index, 1)
      destinationTask.splice(destination.index, 0, removed)

      data[sourceColIndex].issues = sourceTask
      data[destinationColIndex].issues = destinationTask
      data.forEach(item=>{
        item.issues.forEach(issue=>{
          issue.status = item.status;
        })
      })
   
      setData(data);

      const updatedIssues = data.reduce((acc: any[], item)=> {
        acc.push(...item.issues)
        return acc;
      }, [])
      localStorage.setItem(pathName, JSON.stringify(updatedIssues));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {
          data.map(section => (
            <Droppable
              key={section.id}
              droppableId={section.id.toString()}
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className='kanban__section'
                  ref={provided.innerRef}
                >
                  <div className="kanban__section__title">
                    {section.title}
                  </div>
                  <div className="kanban__section__content">
                    {
                      section.issues.map((issues: IIssues, index: number) => (
                        <Draggable
                          key={issues.id}
                          draggableId={issues.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.5' : '1'
                              }}
                            >
                              <Card {...issues}/>
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))
        }
      </div>
    </DragDropContext>
  )
}
