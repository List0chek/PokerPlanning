import React from 'react';
import downloadStoriesIcon from '../../images/download_24px.svg';
import DefaultButton from '../defaultButton/defaultButton';
import CompletedStoryRow from './CompletedStoryRow/completedStoryRow';
import { IPlayerRowProps } from '../DiscussionControllerBlock/PlayersRow/playerRow';
import { IDiscussion } from '../../Store/types';
import './completedStories.css';

export interface ICompletedStory {
  storyName: string;
  avgVote: string;
  usersData: Array<IPlayerRowProps>;
}

interface IProps {
  completedStoriesList: Array<IDiscussion>;

  discussion: IDiscussion | null;

  onCompletedStoryClick(storyName: string): void;

  onDelete(storyName: string): void;

  onDownload(): void;
}

const CompletedStoriesView: React.FunctionComponent<IProps> = (props) => {
  const handleCompletedStoryClick = (discussionId: string) => {
    props.onCompletedStoryClick(discussionId);
  };

  const handleDelete = (discussionId: string) => {
    props.onDelete(discussionId);
  };

  const handleDownload = () => {
    props.onDownload();
  };

  return (
    <div className='completed_stories'>
      <header className='completed_stories_header'>
        <div className='completed_stories_text_and_amount_icon'>
          Completed Stories
          <div className='completed_stories_amount_icon'>
            <span className='completed_stories_amount_icon_stories_count'>{props.completedStoriesList.length}</span>
          </div>
        </div>
        {
          <DefaultButton
            className='completed_stories_download_btn'
            buttonText={
              <img
                id='download_stories_icon'
                src={downloadStoriesIcon}
                alt='downloadStoriesIcon'
                width='14'
                height='17'
              />
            }
            onClick={handleDownload}
          />
        }
      </header>
      <div>
        <table className='players_table'>
          <tbody>
            {props.discussion &&
              props.completedStoriesList.map((item) => {
                return (
                  <CompletedStoryRow
                    key={item.id}
                    discussion={item}
                    onClick={handleCompletedStoryClick}
                    onDelete={handleDelete}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedStoriesView;
