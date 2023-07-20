import type { IDoTestsExits, IFinanceSurveyExits } from './stateTypes';

import { atom, map } from 'nanostores';

export const currentStepState = atom(1);
export const surveyLengthState = atom(0);

export const doTestsExitsState = map<IDoTestsExits>({
  mainExit: 5874453,
  mainPops: 5874457,
  teenExit: 5874458,
  teenPops: 5874460,
  autoExit: 5874492,
  reverse: 5874494,
  backButton: 5908107,
  nonUniqueExit: 5874462,
  accessAutoExit: 5874496,
  photoExit: 5874497,
  noThankYou: 5892040,
  noThankYouPops: 5892041,
  motivatedYes: 5906970,
  motivatedYesPops: 5906971,
  mainExitIpp: 5972907,
  mainPopsIpp: 5972947,
  teenExitIpp: 5972992,
  teenPopsIpp: 5972993,
  nonUniqueIpp: 5973160,
  noThankYouIpp: 5973161,
  noThankYouPopsIpp: 5973162,
  gameFinishIpp: 6020461,
  cookiesDisabled: 6088166,
  vignetteShowHint: 5948180,
  vignetteGameOver: 5959144,
  vignetteGetHint: 5959137,
});

export const financeExitsState = map<IFinanceSurveyExits>({
  // main exit IPP
  ipp_main_exit: [4292523, 4292518, 4292525, 4292526, 4292527],
  // ipp_main_exit_pops: [5128285, 5368781, 5368782, 5368783, 5368785],
  ipp_main_exit_pops: 5128285,
  // main exits onclick
  onclick_main_exit: [3746391, 3746371, 3746380, 4209942, 4209943],
  onclick_main_exit_pops: [4292607, 5368774, 5368775, 5368776, 5368777],

  // teenage exit IPP
  ipp_teen: [4326638, 4326645, 4326647, 4326652, 4326653],
  ipp_teen_pops: 4949467,
  // teen exits onclick
  onclick_teen: [4292671, 4292670, 4292672, 4292673, 4292674],
  onclick_teen_pops: 4292859,

  // auto exit IPP
  ipp_autoexit: [5381339, 5381330],
  ipp_autoexit_pops: 5381332,

  //auto exit onclick. User does nothing and on the first question, I open that.
  onclick_autoexit: [4292614, 4292615, 4292618],
  onclick_autoexit_pops: [5206508, 5125654],

  // non unique
  ipp_not_unique: [5381235, 5381238, 5381239, 5381241, 5381242],
  ipp_not_unique_teen: 5381316,
  // not unique exits onclick
  onclick_not_unique: [5223532, 5223534, 5223535, 5223536, 5223537],
  onclick_not_unique_teen: 5223503,

  //back exit
  onclick_back_zone: 5223498,

  // push
  push_zone: [4842422, 4842423, 4842621, 4842618, 4842617],
  // reverse
  onclick_reverse_zone: [4292574, 4292573, 4292576, 4292579, 4292580],
});
