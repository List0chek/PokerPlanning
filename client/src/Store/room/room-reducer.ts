import { ICard, IRoom, IVote } from '../types';
import { ActionType } from '../reducer';
import { IVoteAction, removeStory } from './room-action-creators';

const initState = [
  {
    id: '123',
    name: 'roomName1',
    ownerId: '3520061f-3ade-43a0-9c21-4b62088ccdbc',
    hostId: '3520061f-3ade-43a0-9c21-4b62088ccdbc',
    members: [
      {
        id: '3520061f-3ade-43a0-9c21-4b62088ccdbc',
        name: 'userName 1',
        token: 'HwYgNd46oEOcIUtiCIzNvA==',
      },
      {
        id: '96eda390-266f-49c3-99db-36fad60f8106',
        name: 'userName 2',
        token: 'kKPtlm8mw0mZ2zb61g+BBg==',
      },
      {
        id: 'd92aa5b4-290e-495a-909d-a26ea4ca068a',
        name: 'userName 3',
        token: 'tKUq2Q4pWkmQnaJupMoGig==',
      },
    ],
    discussions: [
      {
        id: '456',
        roomId: '123',
        topic: 'topicName1',
        dateStart: '2021-04-30T06:25:58.1448663+04:00',
        dateEnd: '2021-04-30T06:31:22.9193279+04:00',
        votes: [
          {
            id: '699f20d4-5fdd-406f-a3e3-151d9568ce79',
            cardId: '5e70029d-6592-4beb-9765-bd93e3809ff5',
            roomId: '123',
            discussionId: '456',
            user: {
              id: 'd92aa5b4-290e-495a-909d-a26ea4ca068a',
              name: 'userName 3',
              token: 'tKUq2Q4pWkmQnaJupMoGig==',
            },
            card: {
              id: '5e70029d-6592-4beb-9765-bd93e3809ff5',
              name: '13',
              value: '13',
            },
          },
          {
            id: '6169b231-a07a-45e0-9066-74d7a1376d74',
            cardId: 'afc6f1ca-73fe-4f3a-a096-0d37de56475b',
            roomId: '123',
            discussionId: '456',
            user: {
              id: '3520061f-3ade-43a0-9c21-4b62088ccdbc',
              name: 'userName 1',
              token: 'HwYgNd46oEOcIUtiCIzNvA==',
            },
            card: {
              id: 'afc6f1ca-73fe-4f3a-a096-0d37de56475b',
              name: '89',
              value: '89',
            },
          },
          {
            id: 'aaa30811-1496-4cc0-b2bc-ce51d0522cc5',
            cardId: '0a573be3-cb46-4725-b399-1ba32515a80b',
            roomId: '123',
            discussionId: '456',
            user: {
              id: '96eda390-266f-49c3-99db-36fad60f8106',
              name: 'userName 2',
              token: 'kKPtlm8mw0mZ2zb61g+BBg==',
            },
            card: {
              id: '0a573be3-cb46-4725-b399-1ba32515a80b',
              name: '8',
              value: '8',
            },
          },
        ],
        averageResult: 36.666666666666664,
        duration: 5.4129076933333335,
      },
    ],
    hashCode: 'null',
    deck: {
      id: 'cc697d91-76a1-4612-8f32-7cfdcee8cd74',
      name: 'defaultDeck',
      cards: [
        {
          id: 'f2089ca9-c197-42a0-aa93-4051e0146902',
          name: '0',
          value: '0',
        },
        {
          id: '31db0cab-a6f3-4fba-82bd-7c6d8096305a',
          name: '1',
          value: '1',
        },
        {
          id: 'bc1ecf5b-88c2-4c8e-9d3a-7cd15c8ccc8d',
          name: '2',
          value: '2',
        },
        {
          id: '3c6b9ebc-ae8f-449d-b97a-648f7ff6652b',
          name: '3',
          value: '3',
        },
        {
          id: '9245195e-3380-40e0-b050-419625724934',
          name: '5',
          value: '5',
        },
        {
          id: '0a573be3-cb46-4725-b399-1ba32515a80b',
          name: '8',
          value: '8',
        },
        {
          id: '5e70029d-6592-4beb-9765-bd93e3809ff5',
          name: '13',
          value: '13',
        },
        {
          id: 'ef9b7da3-ffb1-4587-8b04-584ca87ae65f',
          name: '21',
          value: '21',
        },
        {
          id: 'bb211c83-2db5-40e4-8f8b-6fd4bdb8d154',
          name: '34',
          value: '34',
        },
        {
          id: '70717dee-cfd8-424b-9cee-7888878a1076',
          name: '55',
          value: '55',
        },
        {
          id: 'afc6f1ca-73fe-4f3a-a096-0d37de56475b',
          name: '89',
          value: '89',
        },
        {
          id: '8377de00-a35f-4d3c-9f7c-8ac23d050fcd',
          name: '?',
          value: '?',
        },
        {
          id: '81d3caeb-1133-440c-b9e5-9e032eca7c87',
          name: '∞',
          value: '∞',
        },
        {
          id: 'be6124c1-faef-4d12-ab76-4bf2eb037ec4',
          name: '&#9749',
          value: '&#9749',
        },
      ],
    },
  },
];

/*const updatedDiscussions: ICard = state
  .find((r) => r.id === action.roomId)!
  .discussions.find((d) => d.id === action.discussionId)!
  .votes.find((u) => u.user.id === action.userId)!.card;*/
/*TODO: обновлять discussions с новыми votes.*/

export function roomReducer(state: Array<IRoom> = initState, action: IVoteAction): Array<IRoom> {
  switch (action.type) {
    case ActionType.VOTE:
      return state.map((r) => {
        if (action.roomId === r.id) {
          return {
            ...r,
            votes: action.card,
          };
        }
        return r;
      });
    default:
      return state;
  }
}
