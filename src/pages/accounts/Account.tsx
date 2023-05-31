import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/_Account.scss';
import {
  AiOutlineLeft,
  AiFillCaretLeft,
  AiFillCaretRight,
} from 'react-icons/ai';
import { BsFillPenFill } from 'react-icons/bs';
import moment, { Moment } from 'moment';
import Select from 'react-select';
import { Calendar, Chart, Controller } from '../../components';
import ChartLastMonth from '../../components/elements/ChartLastMonth';
import AccountName from '../../components/elements/AccountName';
import AccountMonth from '../../components/elements/AccountMonth';

function Account(): JSX.Element {
  const navigate = useNavigate();

  // 가계부 이름 수정 모달창
  const [nameModal, setNameModal] = useState<boolean>(false);

  const nameModalOpen = (): void => {
    setNameModal(true);
  };

  // 월별 조회 모달창
  const [monthModal, setMonthModal] = useState<boolean>(false);

  const monthModalOpen = (): void => {
    setMonthModal(true);
  };

  // 캘린더 날짜 받는 라이브러리
  const [getMoment, setMoment] = useState(moment());
  const today: Moment = getMoment;

  // 하단 사용내역 카테고리 필터링 버튼
  type Category = {
    name: string;
    selected: boolean;
  };

  const [category, setCategory] = useState<Category[]>([
    { name: '전체', selected: true },
    { name: '수입', selected: false },
    { name: '지출', selected: false },
  ]);
  const [currentCategory] = category.filter((e) => e.selected === true);
  console.log('현재선택:', currentCategory?.name);

  const categoryOnclick = (idx: number): void => {
    const updatedCategory = category.map((el, index) => {
      if (index === idx) {
        return { ...el, selected: true };
      }
      return { ...el, selected: false };
    });
    setCategory(updatedCategory);
  };

  // 하단 사용내역 카테고리 셀렉트 박스

  // 수입 셀렉트 박스
  const inOptions: { value: string; label: string }[] = [
    { value: 'EMPLOYMENT_INCOME', label: '근로소득' },
    { value: 'BUSINESS', label: '사업' },
    { value: 'STOCKS', label: '주식' },
    { value: 'INVESTMENT', label: '투자' },
    { value: 'ALLOWANCE', label: '용돈' },
    { value: 'FIXED_DEPOSIT_MATURITY', label: '적금 만기' },
    { value: 'OTHER', label: '기타' },
  ];

  const [selectInValue, setSelectInValue] = useState('');
  console.log('선택:', selectInValue);

  const inSelectCustom = {
    control: (provided: any, state: any) => ({
      ...provided,
      'marginTop': '16px',
      'width': '180px',
      'height': '32px',
      'borderRadius': '999px',
      'border': `1px solid ${state.isFocused ? '#FFD12E' : '#e8e8e8'}`,
      'fontSize': '14px',
      'textAlign': 'center',
      'paddingLeft': '15px',
      '&:hover': {
        border: `1px solid ${state.isFocused ? '#FFD12E' : '#e8e8e8'}`,
      },
      'boxShadow': 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      'backgroundColor': state.isSelected ? '#FFF3C7' : 'ffffff',
      'borderRadius': '5px',
      'color': state.isSelected ? 'black' : 'black',
      'fontSize': '14px',
      'textAlign': 'center',
      'paddingRight': '16px',
      '&:hover': { backgroundColor: '#F5F5F5' },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '10px',
      width: '180px',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      '& svg': {
        width: '20px',
        height: '20px',
      },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  };

  // 지출 셀렉트 박스
  const exOptions: { value: string; label: string }[] = [
    { value: 'UTILITY_BILL', label: '월세/관리비/공과금' },
    { value: 'CONDOLENCE_EXPENSE', label: '경조사비' },
    { value: 'TRANSPORTATION', label: '교통비' },
    { value: 'COMMUNICATION_EXPENSES', label: '통신비' },
    { value: 'INSURANCE', label: '보험' },
    { value: 'EDUCATION', label: '교육' },
    { value: 'SAVINGS', label: '저축' },
    { value: 'CULTURE', label: '문화' },
    { value: 'HEALTH', label: '건강' },
    { value: 'FOOD_EXPENSES', label: '식비' },
    { value: 'SHOPPING', label: '쇼핑' },
    { value: 'LEISURE_ACTIVITIES', label: '여가활동' },
    { value: 'OTHER', label: '기타' },
  ];

  const [selectExValue, setSelectExValue] = useState('');
  console.log('선택:', selectExValue);

  const exSelectCustom = {
    control: (provided: any, state: any) => ({
      ...provided,
      'marginTop': '16px',
      'width': '180px',
      'height': '32px',
      'borderRadius': '999px',
      'border': `1px solid ${state.isFocused ? '#FFD12E' : '#e8e8e8'}`,
      'fontSize': '14px',
      'textAlign': 'center',
      'paddingLeft': '15px',
      '&:hover': {
        border: `1px solid ${state.isFocused ? '#FFD12E' : '#e8e8e8'}`,
      },
      'boxShadow': 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      'backgroundColor': state.isSelected ? '#FFF3C7' : 'ffffff',
      'borderRadius': '5px',
      'color': state.isSelected ? 'black' : 'black',
      'fontSize': '14px',
      'textAlign': 'center',
      'paddingRight': '16px',
      '&:hover': { backgroundColor: '#F5F5F5' },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '10px',
      width: '180px',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      '& svg': {
        width: '20px',
        height: '20px',
      },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  };

  return (
    <>
      <Controller />
      {nameModal && <AccountName setNameModal={setNameModal} />}
      {monthModal && <AccountMonth setMonthModal={setMonthModal} />}

      <div className="_AccountBackground">
        <div className="header">
          <button
            type="button"
            className="preBtn"
            onClick={() => navigate('/')}
          >
            <AiOutlineLeft />
          </button>

          <div className="month">
            <button
              className="sideBtn"
              type="button"
              onClick={() => {
                setMoment(getMoment.clone().subtract(1, 'month'));
              }}
            >
              <AiFillCaretLeft />
            </button>

            <button type="button" onClick={monthModalOpen}>
              <h1>{today.format('M')}월</h1>
            </button>

            <button
              type="button"
              className="sideBtn"
              onClick={() => {
                setMoment(getMoment.clone().add(1, 'month'));
              }}
            >
              <AiFillCaretRight />
            </button>
          </div>
        </div>

        <button type="button" className="_AccountName" onClick={nameModalOpen}>
          <span>가계부 이름</span> <BsFillPenFill />
        </button>

        <div className="total">
          <p>이번달 모은 금액</p>
          <p className="totalMoney">20,000원</p>
        </div>

        <div className="incmExpnd">
          <p>
            수입 <span className="incm">80,000원</span>
          </p>
          <p>
            지출 <span className="expnd">60,000원</span>
          </p>
        </div>
      </div>

      <div className="line"> </div>
      <Calendar today={today} />
      <div className="line"> </div>
      <Chart />
      <div className="line"> </div>
      <ChartLastMonth />
      <div className="line"> </div>

      <div className="_AccountBackground">
        <div className="accountHeader">
          <div className="accountFilter">
            {category.map((el, i) => (
              <div
                key={el.name}
                role="button"
                onClick={() => categoryOnclick(i)}
                onKeyDown={() => categoryOnclick(i)}
                tabIndex={0}
                className={
                  el.selected ? 'accountFocusFilterBtn' : 'accountFilterBtn'
                }
              >
                {el.name}
              </div>
            ))}
          </div>
          {category[1].selected === true ? (
            <Select
              placeholder="수입 카테고리"
              options={inOptions}
              onChange={(e: any) => setSelectInValue(e.value)}
              styles={inSelectCustom}
            />
          ) : null}
          {category[2].selected === true ? (
            <Select
              placeholder="지출 카테고리"
              options={exOptions}
              onChange={(e: any) => setSelectExValue(e.value)}
              styles={exSelectCustom}
            />
          ) : null}
        </div>

        <div className="accountBody">
          <p className="accountDate">14일 일요일</p>
          <div className="accountBodyLine" />

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>저축</p>
              <p className="accountLabelEx">-25,000원</p>
            </div>
            <p className="accountCategory">지출 {'>'} 저축</p>
          </div>

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>세븐일레븐</p>
              <p className="accountLabelEx">-3,000원</p>
            </div>
            <p className="accountCategory">지출 {'>'} 식비</p>
          </div>

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>삼성전자 배당금</p>
              <p className="accountLabelIn">+9,000원</p>
            </div>
            <p className="accountCategory">수입 {'>'} 주식</p>
          </div>

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>코레일</p>
              <p className="accountLabelEx">-9,000원</p>
            </div>
            <p className="accountCategory">지출 {'>'} 교통</p>
          </div>
        </div>

        <div className="accountBody">
          <p className="accountDate">15일 월요일</p>
          <div className="accountBodyLine" />

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>세븐일레븐</p>
              <p className="accountLabelEx">-3,000원</p>
            </div>
            <p className="accountCategory">지출 {'>'} 식비</p>
          </div>

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>삼성전자 배당금</p>
              <p className="accountLabelIn">+9,000원</p>
            </div>
            <p className="accountCategory">수입 {'>'} 주식</p>
          </div>

          <div className="accountBodyContents">
            <div className="accountLabel">
              <p>코레일</p>
              <p className="accountLabelEx">-9,000원</p>
            </div>
            <p className="accountCategory">지출 {'>'} 교통</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
