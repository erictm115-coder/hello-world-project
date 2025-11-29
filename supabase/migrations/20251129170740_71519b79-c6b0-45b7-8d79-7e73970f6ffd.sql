-- Make user_id nullable and drop foreign key constraint
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;
ALTER TABLE subscriptions ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policy to allow viewing by email or user_id
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;

CREATE POLICY "Users can view own subscription" 
ON subscriptions 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR 
  (SELECT email FROM auth.users WHERE id = auth.uid()) = subscriptions.email
);