export interface Customer {
  id: number;
  business_id: number;
  quickesta_user_id?: string;
  is_quickesta_user: boolean;
  full_name: string;
  phone?: string;
  email?: string;
  notes?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Appointment {
  id: number;
  business_id: number;
  customer_id: number;
  team_member_id: number;
  service_id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  price_charged: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  cancellation_reason?: string;
  notes?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CreateCustomerInput {
  business_id: number;
  full_name: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface CreateAppointmentInput {
  business_id: number;
  customer_id: number;
  team_member_id: number;
  service_id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  price_charged: number;
  notes?: string;
}

export interface AvailableTimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
} 