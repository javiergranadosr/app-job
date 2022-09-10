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
    _id: string;
  };
  vacant: {
    title: string;
    _id: string;
  };
  uid: string;
  applyDate: string;
}

