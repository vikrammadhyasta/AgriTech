import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, rating, comment }: { productId: string; rating: number; comment: string }) => {
      if (!user) throw new Error('Must be logged in to review');

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating,
          comment
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      toast.success('Review submitted successfully!');
    },
    onError: (error: Error) => {
      if (error.message.includes('duplicate')) {
        toast.error('You have already reviewed this product');
      } else {
        toast.error('Failed to submit review');
      }
    }
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, rating, comment, productId }: { reviewId: string; rating: number; comment: string; productId: string }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update({ rating, comment })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;
      return { ...data, productId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', data.productId] });
      toast.success('Review updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update review');
    }
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, productId }: { reviewId: string; productId: string }) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      toast.success('Review deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete review');
    }
  });
};
