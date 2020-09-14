import React, { useState } from 'react';
import { connect } from 'react-redux';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
import Loader from './Loader';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');

  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    props.dispatch(initiateGetResult(searchTerm)).then(() => {
      setIsLoading(false);
      setSelectedCategory('albums');
    });
  };

  const loadMore = async (type) => {
    const { dispatch, albums, artists, playlist } = props;
    setIsLoading(true);
    switch (type) {
      case 'albums':
        await dispatch(initiateLoadMoreAlbums(albums.next));
        break;
      case 'artists':
        await dispatch(initiateLoadMoreArtists(artists.next));
        break;
      case 'playlist':
        await dispatch(initiateLoadMorePlaylist(playlist.next));
        break;
      default:
    }
    setIsLoading(false);
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  return (
    <React.Fragment>
      <Header />
      <SearchForm handleSearch={handleSearch} />
      <Loader show={isLoading}>Loading...</Loader>
      <SearchResult
        result={result}
        loadMore={loadMore}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);
