type Person = {
  adult?: boolean;
  gender?: number;
  id: number;
  known_for_department?: string;
  name: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  credit_id?: string;
};

type CastMember = Person & {
  cast_id: number;
  character: string;
  order: number;
};

type CrewMember = Person & {
  department: string;
  job: string;
};

type MovieCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};
