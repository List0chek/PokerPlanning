import { ActionType } from '../reducer';
import { IToggleLoadingIndicator } from './loading-action-creators';

export function loadingIndicatorReducer(state = false, action: IToggleLoadingIndicator): boolean {
  switch (action.type) {
    case ActionType.TOGGLE_LOADING_INDICATOR:
      return action.showIndicator;
    default:
      return state;
  }
}
