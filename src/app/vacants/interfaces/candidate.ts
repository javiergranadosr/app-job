export interface TotalCandidates {
  total: number;
}

export interface Candidates {
  total: number;
  candidates: Candidate[];
}
export interface Candidate {
  candidate: {
    email: string;
    name: string;
    image?: string;
    _id: string;
  };
  vacant: {
    title: string;
    _id: string;
  };
  uid: string;
  applyDate: string;
}

export interface Apply {
  candidate: string;
  vacant: string;
}

export interface ResponseAppy {
  message: string;
  data: {
    candidate: string;
    vacant: string;
    uid: string;
    applyDate: string;
  };
}
