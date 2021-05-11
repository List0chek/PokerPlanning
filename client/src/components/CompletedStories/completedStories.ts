import React from 'react';
import { IRootState } from '../../Store/types';
import { connect } from 'react-redux';
import CompletedStoriesView from './completedStories-view';
import './completedStories.css';

const mapStateToProps = (state: IRootState) => {
  return {
    discussion: state.discussion,
  };
};

export default connect(mapStateToProps)(CompletedStoriesView);
