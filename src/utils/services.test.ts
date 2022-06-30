import { getYoutubeId } from './services';

test('Testing getYoutubeId that return the id', () => {
  let url = 'https://www.youtube.com/watch?v=P5fd34h4HC';
  expect(getYoutubeId(url)).toBe('P5fd34h4HC');
  url = 'https://www.youtube.com/watch?v=X5fr95h4YC&channel=test&name=test';
  expect(getYoutubeId(url)).toBe('X5fr95h4YC');
});
