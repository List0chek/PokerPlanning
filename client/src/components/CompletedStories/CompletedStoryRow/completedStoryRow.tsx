import React from 'react';
import deleteStoryIcon from '../../../images/delete_24px.svg';
import DefaultButton from '../../defaultButton/defaultButton';
import { IDiscussion } from '../../../Store/types';
import './completedStoryRow.css';

export interface ICompletedStoryRowProps {
  discussion: IDiscussion;
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

  return (
    <tr className='row'>
      <td className='completed_stories_cell_storyname' onClick={handleClick}>
        {props.discussion.topic}
      </td>
      <td className='completed_stories_cell_avg_vote'>
        {props.discussion.averageResult ? props.discussion.averageResult : '0'}
      </td>
      <td className='completed_stories_cell_delete_story_button'>
        {
          <DefaultButton
            className='completed_stories_delete_btn'
            buttonText={<img src={deleteStoryIcon} alt='deleteStoryIcon' width='14' height='18' />}
            onClick={handleDelete}
          />
        }
      </td>
    </tr>
  );
};

export default CompletedStoryRow;
