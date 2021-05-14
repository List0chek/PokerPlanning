import React from 'react';
import deleteStoryIcon from '../../../images/delete_24px.svg';
import DefaultButton from '../../DefaultButton/DefaultButton';
import { IDiscussion, IRoom, IUser } from '../../../store/Types';
import './CompletedStoryRow.css';

export interface ICompletedStoryRowProps {
  user: IUser | null;
  discussion: IDiscussion;
  room: IRoom | null;
  onClick(storyName: string): void;
  onDelete(storyName: string): void;
}

const CompletedStoryRow: React.FunctionComponent<ICompletedStoryRowProps> = (props) => {
  const handleClick = () => {
    props.onClick(props.discussion.id);
  };

  const handleDelete = () => {
    props.onDelete(props.discussion.id);
  };

  const currentDiscussionIndex = props.room && props.room.discussions.length - 1;
  const currentDiscussion =
    currentDiscussionIndex != undefined && props.room != undefined && currentDiscussionIndex >= 0
      ? props.room.discussions[currentDiscussionIndex]
      : null;

  return (
    <tr className='row'>
      <td className='completed_stories_cell_storyname' onClick={handleClick}>
        {props.discussion.topic}
      </td>
      <td className='completed_stories_cell_avg_vote'>
        {props.discussion.averageResult ? props.discussion.averageResult : '0'}
      </td>
      <td className='completed_stories_cell_delete_story_button'>
        {props.user && props.room && props.user.id === props.room.hostId && (
          <DefaultButton
            className={
              currentDiscussion?.id !== props.discussion.id
                ? 'completed_stories_delete_btn'
                : 'completed_stories_delete_btn_notClickable'
            }
            buttonText={<img src={deleteStoryIcon} alt='deleteStoryIcon' width='14' height='18' />}
            onClick={handleDelete}
          />
        )}
      </td>
    </tr>
  );
};

export default CompletedStoryRow;
