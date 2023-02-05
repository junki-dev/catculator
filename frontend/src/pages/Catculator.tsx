/** @jsxImportSource @emotion/react */
import { getFeedAmount } from '../api/calculator';
import BaseButton from '../components/BaseButton';
import BaseDatePicker from '../components/Form/BaseDatePicker';
import BaseSelect, { IMenuItem } from '../components/Form/BaseSelect';
import BaseTextField from '../components/Form/BaseTextField';
import ResultBox from '../components/ResultBox';
import { useFeedList } from '../hooks/query/feed';
import { getLivedMonth } from '../utils';

import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, css, CssBaseline, Collapse, List, ListItem, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Big } from 'big.js';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';

interface IFormInputs {
  weight: string;
  birthday: Date;
  energyReq: string;
  kcal: string;
  feed: string;
}

interface IInfo {
  label: string;
  value?: number | string;
  unit?: string;
}

type InfoKeys = 'age' | 'rer' | 'der';

const Infos: Record<InfoKeys, IInfo> = {
  age: { label: '나이', unit: '살' },
  rer: { label: 'RER(기초 대사량)' },
  der: { label: 'DER(하루 에너지 요구량)', unit: 'kcal' },
};

const energyList: IMenuItem[] = [
  { value: 1.2, name: '1.2 | 중성화한 성묘' },
  { value: 1.5, name: '1.5 | 운동량이 활발한 고양이' },
  { value: 1.4, name: '1.4 | 중성화하지 않은 성묘' },
  { value: 0.8, name: '0.8 | 체중 감량이 필요한 성묘' },
  { value: 1.7, name: '1.7 | 체중 증량이 필요한 성묘' },
  { value: 3, name: '3.0 | 4개월 이하' },
  { value: 2.5, name: '2.5 | 4~6개월' },
  { value: 2, name: '2 | 6~12개월' },
  { value: 3, name: '3 | 임신 수유증' },
];

function renderItem({ label, value, unit }: IInfo) {
  return (
    <ListItem>
      <Typography
        css={css({ margin: '1rem 0 0 0', fontWeight: 'bold' })}
        variant="body1"
        color="text.secondary"
        align="center"
      >
        <span>{`우리 고양이 `}</span>
        <span css={css({ color: '#A074C3' })}>{`${label} `}</span>
        <span>{`은(는) `}</span>
        <span css={css({ color: '#CA6C50' })}>{`${value}${unit} `}</span>
        <span>{`입니다.`}</span>
      </Typography>
    </ListItem>
  );
}

export default function Catculator() {
  // useState
  const [amount, setAmount] = useState<number>();

  // useQuery
  const { data, isLoading } = useFeedList();

  // useMemo
  const feedList: IMenuItem[] = useMemo(() => {
    return data
      ? data.map((feed) => {
          return { value: feed.id, name: `[${feed.company}] ${feed.name}` } as IMenuItem;
        })
      : [];
  }, [data]);
  const [moreInfos, setMoreInfos] = useState<IInfo[]>([]);

  // useForm
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: { weight: '', birthday: new Date(), energyReq: '', kcal: '', feed: '' },
  });

  // useCallback
  const onSubmit: SubmitHandler<IFormInputs> = useCallback(async (data) => {
    const feedAmountResp = await getFeedAmount({
      weight: Number(data.weight),
      birthday: new Date(dayjs(data.birthday).format('YYYY/MM/DD')),
      energyRequirements: Number(data.energyReq),
      kcal: Number(data.kcal),
      feedId: Number(data.feed),
    });

    Infos['age'].value = Big(await getLivedMonth(data.birthday))
      .div(12)
      .round(1, Big.roundDown)
      .toNumber();
    Infos['rer'].value = feedAmountResp.rer;
    Infos['der'].value = feedAmountResp.der;

    setAmount(feedAmountResp.amount);
  }, []);

  const resetForm = useCallback(async () => {
    reset({ weight: '', birthday: new Date(), energyReq: '', feed: '', kcal: '' });

    setAmount(0);
    setMoreInfos([]);
  }, [reset]);

  // handle states
  const handleDisplayInfos = () => {
    let idx = 0;
    let key: InfoKeys;

    setMoreInfos([]);

    const interval = setInterval(async () => {
      key = Object.keys(Infos)[idx] as InfoKeys;

      if (idx === Object.keys(Infos).length - 1) {
        clearInterval(interval);
      }

      setMoreInfos((prev) => [
        { label: Infos[key].label, value: Infos[key].value || 0, unit: Infos[key].unit || '' },
        ...prev,
      ]);
      idx++;
    }, 1000);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
        <CalculateRoundedIcon />
      </Avatar>
      <Typography css={css({ fontWeight: 'bold', marginBottom: '1.5rem' })} color="primary" component="h1" variant="h5">
        CATCULATOR
      </Typography>

      <ResultBox amount={amount ? amount : 0} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        css={css({
          marginTop: '1rem',
          width: '25%',
          minWidth: '17rem',
          backgroundColor: '#FFF9EC',
        })}
      >
        <BaseTextField
          control={control}
          name="weight"
          label="몸무게(kg)"
          id="weight"
          isFocus={true}
          isRequired={true}
        />
        <BaseDatePicker control={control} name="birthday" label="생일" />
        <BaseSelect
          control={control}
          name="energyReq"
          label="에너지 요구량"
          id="energyReq"
          items={energyList}
          isRequired={true}
        />
        <BaseTextField control={control} name="kcal" label="사료 칼로리(kcal/kg)" id="kcal" />
        <BaseSelect control={control} name="feed" label="사료" id="feed" items={feedList} />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem' }}
          loading={isLoading}
        >
          계산하기
        </LoadingButton>
      </form>

      <Box sx={{ width: '25%', minWidth: '17rem', backgroundColor: '#F3EADA' }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            <BaseButton
              label="More Info"
              color="#007664"
              disabled={amount ? false : true}
              onClick={handleDisplayInfos}
            />
          </Grid2>
          <Grid2 xs={6}>
            <BaseButton label="Reset" color="#FF8C5B" onClick={resetForm} />
          </Grid2>
        </Grid2>
      </Box>

      <Box sx={{ mt: 1, width: '25%', minWidth: '1rem' }}>
        <List>
          <TransitionGroup>
            {moreInfos.map((info) => (
              <Collapse key={info.label}>{renderItem(info)}</Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Box>
  );
}
