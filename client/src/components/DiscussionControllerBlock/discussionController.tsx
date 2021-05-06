import React from 'react';
import DefaultButton from '../defaultButton/defaultButton';
import InviteFriend from './InviteFriend/inviteFriend';
import CreateNewDiscussionControl from './CreateNewDiscussion/createNewDiscussionControl';
import PlayerRow, { IPlayerRowProps } from './/PlayersRow/playerRow';
import { IVote } from '../../Store/types';
import './discussionController.css';

interface IProps {
  buttonText?: string;
  playersList: Array<IVote>;
  url: string;
  buttonClass?: string;

  onGoButtonClick(discussionName: string): void;
  onEnterButtonClick(isClosed: boolean): void;

  isCardChecked: boolean;
  isDiscussionClosed: boolean;
  discussionName: string;
}

interface IState {
  buttonState: string;
}

const ButtonState: Array<string> = ['notClicked', 'FinishVotingIsClicked', 'NextIsClicked'];

class DiscussionController extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      buttonState: ButtonState[0],
    };
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
  }

  public handleEnterButtonClick = () => {
    this.props.onEnterButtonClick(this.props.isDiscussionClosed);
    const i = ButtonState.indexOf(this.state.buttonState);
    this.setState({
      buttonState: ButtonState[i + 1],
    });
  };

  public handleGoButtonClick = (discussionName: string) => {
    this.props.onGoButtonClick(discussionName);
    this.setState({
      buttonState: ButtonState[0],
    });
  };

  public render() {
    const { playersList, url, isDiscussionClosed } = this.props;
    const { buttonState } = this.state;

    return (
      <div className='story_vote'>
        <header className='story_vote_header'>Story vote completed</header>
        <div className='players_name_row'>
          <span className='players_name_text'>Players:</span>
        </div>
        <div>
          <table className={'players_table'}>
            <tbody>
              {playersList.map((item) => {
                return (
                  <PlayerRow
                    key={item.user.id}
                    user={item.user}
                    card={item.card}
                    isCardChecked={this.props.isCardChecked}
                    isDiscussionClosed={this.props.isDiscussionClosed}
                  />
                );
              })}
            </tbody>
          </table>
          {/*Как вариант можно ставить условие так: buttonState == ButtonState[0] || buttonState == ButtonState[1], но тогда будет хуже читабельность кода*/}
          {buttonState == 'notClicked' || buttonState == 'FinishVotingIsClicked' ? (
            <DefaultButton
              className='story_vote_button'
              buttonText={isDiscussionClosed === false ? 'Finish voting' : 'Next'}
              onClick={this.handleEnterButtonClick}
            />
          ) : (
            <CreateNewDiscussionControl onGoButtonClick={this.handleGoButtonClick} />
          )}
        </div>
        <InviteFriend url={url} />
      </div>
    );
  }
}

export default DiscussionController;
