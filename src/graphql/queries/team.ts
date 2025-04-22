import { gql } from '@apollo/client'

export const GET_TEAM_MEMBERS_BY_USER_ID = gql`
  query GetTeamMembersByUserId($userId: uuid!) {
    team_members(where: { user_id: { _eq: $userId } }) {
      id
      business_id
      role
      status
    }
  }
`

export interface TeamMember {
  id: number
  business_id: number
  role: string
  status: string
}

export interface GetTeamMembersByUserIdResponse {
  team_members: TeamMember[]
}

export interface GetTeamMembersByUserIdVariables {
  userId: string
} 