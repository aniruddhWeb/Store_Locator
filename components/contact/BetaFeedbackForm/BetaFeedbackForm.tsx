import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { CustomSelect } from 'components/common/CustomSelect/CustomSelect';
import { useCurrentUserDynamic } from 'services/user';
import { useSendFeedback } from 'hooks/useSendFeedback';
import { useRouter } from 'next/router';
import { Route } from 'config/Routes';
import s from './BetaFeedbackForm.module.css';

const searchGoalOptions = [
  { title: 'Dispensaries', value: 'Dispensaries' },
  { title: 'Deliveries', value: 'Deliveries' },
  { title: 'Mail Orders', value: 'Mail Orders' },
  {
    title: 'Product (Flower, Edibles, Concentrates, etc.)',
    value: 'Product (Flower, Edibles, Concentrates, etc.)',
  },
];

const isProblemSolvedOptions = [
  { title: 'Yes', value: 'Yes' },
  { title: 'No', value: 'No' },
  { title: 'Maybe', value: 'Maybe' },
];

interface BetaFeedbackFormProps {}

export const BetaFeedbackForm: FC<BetaFeedbackFormProps> = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUserDynamic();
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [feedback, setFeedback] = useState<string>();
  const [isRegistered, setRegistered] = useState(!!currentUser);
  const [problemSolvedStatus, setProblemSolvedStatus] =
    useState<Array<typeof searchGoalOptions[number]>>();
  const [searchGoals, setSearchGoals] =
    useState<Array<typeof searchGoalOptions[number]>>();
  const [emailError, setEmailError] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);
  const [problemSolvedStatusError, setProblemSolvedStatusError] =
    useState(false);
  const [searchGoalsError, setSearchGoalsError] = useState(false);

  const { send, data, isLoading } = useSendFeedback();

  const hasErrors = useMemo(() => {
    if (
      emailError ||
      feedbackError ||
      problemSolvedStatusError ||
      searchGoalsError
    ) {
      return true;
    }

    return false;
  }, [emailError, feedbackError, problemSolvedStatusError, searchGoalsError]);

  const checkErrors = useCallback(() => {
    const feedbackWordsCount = feedback?.split(' ').length || 0;
    const isFeedbackValid = feedbackWordsCount >= 5 && feedbackWordsCount <= 50;

    if (!email || !checkEmail(email)) {
      setEmailError(true);
    }
    if (email && checkEmail(email) && emailError) {
      setEmailError(false);
    }
    if (!feedback || !isFeedbackValid) {
      setFeedbackError(true);
    }
    if (feedback && isFeedbackValid && feedbackError) {
      setFeedbackError(false);
    }
    if (!searchGoals?.length) setSearchGoalsError(true);
    if (!problemSolvedStatus?.length) {
      setProblemSolvedStatusError(true);
    }
    if (searchGoals?.length && searchGoalsError) {
      setSearchGoalsError(false);
    }
    if (problemSolvedStatus?.length && problemSolvedStatusError) {
      setProblemSolvedStatusError(false);
    }
  }, [
    email,
    feedback,
    searchGoals?.length,
    problemSolvedStatus?.length,
    emailError,
    feedbackError,
    searchGoalsError,
    problemSolvedStatusError,
  ]);

  const hasEmptyFields = useMemo(() => {
    return (
      !email ||
      !feedback ||
      !problemSolvedStatus?.length ||
      !searchGoals?.length
    );
  }, [email, feedback, problemSolvedStatus, searchGoals]);

  const submitHandler = useCallback(() => {
    checkErrors();

    if (hasEmptyFields || isLoading || hasErrors) {
      return;
    }

    send(
      feedback!,
      [
        [
          'Are you a registered user on Leafythings?',
          isRegistered ? 'Yes' : 'No',
        ],
        [
          'What do you search for when on Leafythings?',
          searchGoals!?.map(goal => goal.title).join(', '),
        ],
        [
          'Did you find what you were looking for on Leafythings?',
          problemSolvedStatus![0].title,
        ],
      ],
      email,
    );
  }, [
    feedback,
    email,
    isRegistered,
    searchGoals,
    problemSolvedStatus,
    hasEmptyFields,
    hasErrors,
    checkErrors,
  ]);

  useEffect(() => {
    if (!isLoading && data) {
      // eslint-disable-next-line no-alert
      alert('Thank you for submitting feedback!');
      router.push(Route.Root);
    }
  }, [data, isLoading]);

  const checkEmail = useCallback((val: string) => {
    const pattern = /^.+@{1}.+\.{1}.+$/;

    return pattern.test(val);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.description}>
        <span>
          We launched new Product Categories and want to hear feedback from you!
        </span>
        <span>
          Answer the following questions, and leave feedback in the form belong
          for a chance to win 1-of-5 fully loaded swag bags!
        </span>
        <img
          src="/images/betafeedback.png"
          className={s.descriptionImage}
          alt="beta feedback"
        />
      </div>
      <div className={s.form}>
        <div className={cn(s.singleInput, s.withRadio)}>
          <label>Are you a registered user on Leafythings?</label>
          <div className={s.radioGroup}>
            <div
              className={s.optionWrapper}
              onClick={() => setRegistered(true)}>
              <div
                className={cn(s.radioCircle, {
                  [s.checkedRadio]: isRegistered,
                })}>
                <div />
              </div>
              <div className={s.radioLabel}>Yes</div>
            </div>
            <div
              className={s.optionWrapper}
              onClick={() => setRegistered(false)}>
              <div
                className={cn(s.radioCircle, {
                  [s.checkedRadio]: !isRegistered,
                })}>
                <div />
              </div>
              <div className={s.radioLabel}>No</div>
            </div>
          </div>
        </div>
        <div className={s.singleInput}>
          <label>What do you search for when on Leafythings?</label>
          <CustomSelect
            multiselect
            hasError={searchGoalsError}
            placeholder="Select all that apply"
            selectedOptions={searchGoals}
            options={searchGoalOptions}
            onSelect={val => {
              setSearchGoals(val);
              setSearchGoalsError(!val?.length);
            }}
          />
        </div>
        <div className={s.singleInput}>
          <label>Did you find what you were looking for on Leafythings?</label>
          <CustomSelect
            hasError={problemSolvedStatusError}
            selectedOptions={problemSolvedStatus}
            options={isProblemSolvedOptions}
            onSelect={val => {
              setProblemSolvedStatus(val);
              setProblemSolvedStatusError(false);
            }}
          />
        </div>
        <div className={s.singleInput}>
          <label htmlFor="email">
            Enter your email address so we can reach out to you if you win one
            of the swag bags!
          </label>
          <input
            type="text"
            id="email"
            value={email}
            className={cn({ [s.withError]: emailError })}
            onChange={(e: any) => {
              e.preventDefault();
              setEmail(e.target.value);
              setEmailError(
                !e.target.value.length || !checkEmail(e.target.value),
              );
            }}
          />
        </div>
        <div className={s.singleInput}>
          <label htmlFor="feedback">
            Leave feedback on the new Product categories. Did you like them?
            Were they helpful? <br />
            Were there any bugs or glitches experienced? Let us know. Minimum 5
            words, Maximum 50
          </label>
          <textarea
            id="feedback"
            value={feedback}
            className={cn({ [s.withError]: feedbackError })}
            onChange={(e: any) => {
              const feedbackWordsCount = e.target.value?.split(' ').length || 0;
              setFeedbackError(
                feedbackWordsCount < 5 || feedbackWordsCount > 50,
              );
              e.preventDefault();
              setFeedback(e.target.value);
            }}
          />
        </div>
        <div
          onClick={submitHandler}
          className={cn(s.submitBtn, {
            [s.disabled]: hasEmptyFields || isLoading || hasErrors,
          })}>
          SUBMIT
        </div>
      </div>
    </div>
  );
};
