import { useEffect } from 'preact/hooks';

import { rewardisUrlState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

interface IUpdateRewardisUrlProps {}

export interface IRewardisUrlParams {
  sub_id1: string; // zone
  sub_id2: string; // request_var
  sub_id3: string; // ymid
  sub_id4: string; // var_3
  sub_id5: string; // click_id
  abtest?: string; // ab2r
}

const UpdateRewardisUrl = ({}: IUpdateRewardisUrlProps) => {
  useEffect(() => {
    const { zone, requestVar, var3, ymid, subId, abTest } = useClientSearchParams();

    const updatedRewardisUrl = new URL(import.meta.env.PUBLIC_REWARDIS_URL);
    const searchParams = updatedRewardisUrl.searchParams;
    searchParams.set('sub_id1', zone);
    searchParams.set('sub_id2', requestVar);
    searchParams.set('sub_id3', ymid);
    searchParams.set('sub_id4', var3);
    searchParams.set('sub_id5', subId);
    searchParams.set('ab2r', abTest);

    rewardisUrlState.set(updatedRewardisUrl.href);
  }, []);

  return null;
};

export default UpdateRewardisUrl;
