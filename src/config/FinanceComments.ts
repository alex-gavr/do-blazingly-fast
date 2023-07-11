import type { TCommentsTexts } from '@i18n/2025/en';

const subCommentIds = [4, 7, 9, 10, 13];

const makeCommentsForFinanceSurvey = (texts: TCommentsTexts) => {
  return texts.map((text, i) => {
    const id = i + 1;
    return {
      id: id,
      name: text.name,
      comment: text.comment,
      likeWord: text.likeWord,
      likes: text.likes,
      timeAgo: text.timeAgo,
      isSubComment: subCommentIds.includes(id) ? true : false,
    };
  });
};

export default makeCommentsForFinanceSurvey;
