-- Fix Issue 1: Profiles table - restrict public exposure of user data
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Allow users to view only their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Admins can view all profiles for administrative purposes
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Fix Issue 2: Notifications table - restrict insert to self or admin only
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

-- Users can only create notifications for themselves
CREATE POLICY "Users can create own notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can create notifications for any user
CREATE POLICY "Admins can create any notification" 
ON public.notifications 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));