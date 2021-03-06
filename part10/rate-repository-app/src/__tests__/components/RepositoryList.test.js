import React from 'react';

import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { kFormatter } from '../../components/RatingsBox';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // added a dummy setSearchKeyboard function to make the test compatible with the final version of the app:
      const setSearchKeyword = () => {};
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} setSearchKeyword={setSearchKeyword} />);

      debug();

      repositories.edges.forEach((repository, i) => {
        expect(getAllByTestId('repositoryName')[i]).toHaveTextContent(repository.node.fullName);
        expect(getAllByTestId('repositoryDescription')[i]).toHaveTextContent(repository.node.description);
        expect(getAllByTestId('repositoryLanguage')[i]).toHaveTextContent(repository.node.language);
        expect(getAllByTestId('repositoryStars')[i]).toHaveTextContent(kFormatter(repository.node.stargazersCount));
        expect(getAllByTestId('repositoryForks')[i]).toHaveTextContent(kFormatter(repository.node.forksCount));
        expect(getAllByTestId('repositoryReviews')[i]).toHaveTextContent(repository.node.reviewCount);
        expect(getAllByTestId('repositoryRating')[i]).toHaveTextContent(repository.node.ratingAverage);
      });
    });
  });
});