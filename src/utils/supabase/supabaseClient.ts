import { createClient } from '@supabase/supabase-js';

const supabase_url = 'https://beoiuusebhgtkhcdfdor.supabase.co';
const supabase_public_key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlb2l1dXNlYmhndGtoY2RmZG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1NDg1MDIsImV4cCI6MTk2OTEyNDUwMn0.rFYG8w1G3iblehMjyDh3xqgs07eRoZECTDlrjb0Zxp8';

export const supabase = createClient(supabase_url, supabase_public_key);
