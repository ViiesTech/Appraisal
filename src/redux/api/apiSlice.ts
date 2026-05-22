import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, endpoints } from '../constant';
import { RootState } from '../store';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [
    'Profile',
    'Notifications',
    'Orders',
    'Order',
    'Checklist',
    'Notes',
    'Conversations',
    'Messages',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: userData => ({
        url: endpoints.REGISTER,
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: credentials => ({
        url: endpoints.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: endpoints.SEND_EMAIL,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: data => ({
        url: endpoints.OTP,
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: data => ({
        url: endpoints.VERIFY_EMAIL,
        method: 'POST',
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: data => ({
        url: endpoints.GOOGLE_LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: endpoints.RESET_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: formData => ({
        url: 'appraiser',
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'appraiser',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    uploadCertificates: builder.mutation({
      query: formData => ({
        url: 'appraiser/certificate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteCertificates: builder.mutation<void, { certificateIds: string[] }>({
      query: body => ({
        url: 'appraiser/certificate',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    getRecentActivity: builder.query<
      {
        success: boolean;
        activities: Array<{
          _id: string;
          action: string;
          description: string;
          type: string;
          createdAt: string;
        }>;
        totalCount: number;
        totalPages: number;
        currentPage: number;
      },
      { page?: number; limit?: number } | void
    >({
      query: params => {
        const page = (params as any)?.page ?? 1;
        const limit = (params as any)?.limit ?? 10;
        return {
          url: `appraiser/activity?page=${page}&limit=${limit}`,
          method: 'GET',
        };
      },
    }),
    getNotifications: builder.query<
      {
        success: boolean;
        unreadCount: number;
        total: number;
        totalPages: number | null;
        notifications: Array<{
          _id: string;
          title: string;
          message: string;
          type: string;
          isRead: boolean;
          createdAt: string;
        }>;
      },
      { isRead?: boolean; type?: string; page?: number; limit?: number }
    >({
      query: ({ isRead, type, page = 1, limit = 20 }) => {
        const parts: string[] = [`page=${page}`, `limit=${limit}`];
        if (isRead !== undefined) parts.push(`isRead=${isRead}`);
        if (type) parts.push(`type=${type}`);
        return {
          url: `appraiser/notifications?${parts.join('&')}`,
          method: 'GET',
        };
      },
      providesTags: ['Notifications'],
    }),
    markAllNotificationsAsRead: builder.mutation<
      { success: boolean; message: string },
      void
    >({
      query: () => ({
        url: 'appraiser/notifications',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
    getOrders: builder.query<
      {
        success: boolean;
        count: number;
        total: number;
        orders: Array<{
          _id: string;
          orderId: string;
          status: string;
          priority: string;
          deadline: string;
          property: {
            address: string;
            type: string;
            form: string;
          };
          lender: {
            companyName: string;
          };
          client: {
            name: string;
          };
          timeline: {
            scheduledAt: string | null;
            inspectionCompletedAt: string | null;
          };
          progressPercent: number;
        }>;
        thisWeekOrders?: Array<{
          _id: string;
          property: { address: string; type: string };
          lender: { companyName: string };
          timeline: { scheduledAt: string | null };
          status: string;
        }>;
        thisWeekRange?: string;
        scheduledDates?: string[];
      },
      {
        date?: string;
        status?: string;
        page?: number;
        limit?: number;
        thisWeek?: boolean;
        getMonthSchedule?: boolean;
      }
    >({
      query: ({
        date,
        status,
        page = 1,
        limit = 20,
        thisWeek,
        getMonthSchedule,
      }) => {
        const parts: string[] = [`page=${page}`, `limit=${limit}`];
        if (date) parts.push(`date=${date}`);
        if (status) parts.push(`status=${status}`);
        if (thisWeek) parts.push(`thisWeek=true`);
        if (getMonthSchedule) parts.push(`getMonthSchedule=true`);
        return {
          url: `appraiser/order?${parts.join('&')}`,
          method: 'GET',
        };
      },
      providesTags: ['Orders'],
    }),
    changePassword: builder.mutation<
      { success: boolean; message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: body => ({
        url: 'appraiser/changePassword',
        method: 'POST',
        body,
      }),
    }),
    getOrderById: builder.query<
      {
        success: boolean;
        message: string;
        order: {
          _id: string;
          orderId: string;
          status: string;
          priority: string;
          deadline: string;
          progressPercent: number;
          internalNotes: string;
          paymentStatus: string;
          images: string[];
          documents: string[];
          links: Array<{ label: string; url: string }>;
          client: {
            name: string;
            email: string;
            phone: string;
            address: string;
          };
          property: { address: string; type: string; form: string };
          lender: {
            companyName: string;
            contactName: string;
            email: string;
            phone: string;
            address: string;
          };
          borrower: { name: string; email: string; phone: string };
          caseNumber: {
            invoice: string;
            client: string;
            lender: string;
            FHA: string;
            Other?: string;
          };
          timeline: {
            assignedAt: string | null;
            scheduledAt: string | null;
            inspectionCompletedAt: string | null;
            finalReportInProgressAt: string | null;
            completedAt: string | null;
            overdueAt: string | null;
            reviewAt: string | null;
            underReviewAt: string | null;
            cancelledAt: string | null;
          };
          createdAt: string;
          updatedAt: string;
        };
      },
      string
    >({
      query: id => ({
        url: `appraiser/order/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    scheduleInspection: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; scheduledAt: string; scheduleNotes: string }
    >({
      query: ({ orderId, ...body }) => ({
        url: `appraiser/order/${orderId}/schedule`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        'Orders',
        { type: 'Order', id: orderId },
      ],
    }),
    submitFinalReport: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; formData: FormData }
    >({
      query: ({ orderId, formData }) => ({
        url: `appraiser/order/${orderId}/submitReport`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        'Orders',
        { type: 'Order', id: orderId },
      ],
    }),
    completeInspection: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: orderId => ({
        url: `appraiser/order/${orderId}/completeInspection`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, orderId) => [
        'Orders',
        { type: 'Order', id: orderId },
      ],
    }),
    getTemplates: builder.query<
      {
        success: boolean;
        message: string;
        total: number;
        templates: Array<{
          _id: string;
          name: string;
          category: string;
          version: string;
          visibility: string;
          description: string;
          fileUrl: string;
          fileSize: number;
          fileSizeFormatted: string;
          downloads: number;
          isActive: boolean;
          revisionNotes: string;
          createdAt: string;
          updatedAt: string;
        }>;
      },
      void
    >({
      query: () => ({
        url: 'appraiser/template',
        method: 'GET',
      }),
    }),
    getCommentExamples: builder.query<
      {
        success: boolean;
        message: string;
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        count: number;
        commentExamples: Array<{
          _id: string;
          category: string;
          isDeleted: boolean;
          comments: string[];
          createdAt: string;
          updatedAt: string;
          createdBy: string;
        }>;
      },
      void
    >({
      query: () => ({
        url: 'appraiser/commentExamples',
        method: 'GET',
      }),
    }),
    // ── Admin Notes ───────────────────────────────────────────────────────────
    getNotes: builder.query<
      {
        success: boolean;
        message: string;
        count: number;
        notes: Array<{
          _id: string;
          target: string;
          targetModel: string;
          adminId: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
          };
          note: string;
          createdAt: string;
          updatedAt: string;
        }>;
      },
      void
    >({
      query: () => ({
        url: 'appraiser/notes',
        method: 'GET',
      }),
      providesTags: ['Notes'],
    }),
    // ── Inspection Checklist ─────────────────────────────────────────────────
    getChecklist: builder.query<
      {
        success: boolean;
        message: string;
        checklist: {
          _id: string;
          orderId: string;
          overallProgress: number;
          categories: Array<{
            _id: string;
            title: string;
            createdAt: string;
            updatedAt: string;
            items: Array<{
              _id: string;
              task: string;
              isCompleted: boolean;
              notes: string;
              images: string[];
            }>;
          }>;
          createdAt: string;
          updatedAt: string;
        };
      },
      string
    >({
      query: orderId => ({
        url: `appraiser/order/${orderId}/checklist`,
        method: 'GET',
      }),
      providesTags: (_result, _error, orderId) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    addCategory: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; title: string }
    >({
      query: ({ orderId, title }) => ({
        url: `appraiser/order/${orderId}/checklist/category`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    updateCategory: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; categoryId: string; title: string }
    >({
      query: ({ orderId, categoryId, title }) => ({
        url: `appraiser/order/${orderId}/checklist/category/${categoryId}`,
        method: 'PATCH',
        body: { title },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; categoryId: string }
    >({
      query: ({ orderId, categoryId }) => ({
        url: `appraiser/order/${orderId}/checklist/category/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    addChecklistItem: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; categoryId: string; formData: FormData }
    >({
      query: ({ orderId, categoryId, formData }) => ({
        url: `appraiser/order/${orderId}/checklist/category/${categoryId}/item`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    updateChecklistItem: builder.mutation<
      { success: boolean; message: string },
      {
        orderId: string;
        categoryId: string;
        itemId: string;
        formData: FormData;
      }
    >({
      query: ({ orderId, categoryId, itemId, formData }) => ({
        url: `appraiser/order/${orderId}/checklist/category/${categoryId}/item/${itemId}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    deleteChecklistItem: builder.mutation<
      { success: boolean; message: string },
      { orderId: string; categoryId: string; itemId: string }
    >({
      query: ({ orderId, categoryId, itemId }) => ({
        url: `appraiser/order/${orderId}/checklist/category/${categoryId}/item/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Checklist', id: orderId },
      ],
    }),
    // ── Chat ─────────────────────────────────────────────────────────────────
    getConversations: builder.query<
      {
        success: boolean;
        message: string;
        conversations: Array<{
          _id: string;
          participants: string[];
          lastMessage?: any;
          updatedAt?: string;
        }>;
      },
      void
    >({
      query: () => ({ url: 'conversations', method: 'GET' }),
      providesTags: ['Conversations'],
    }),
    createConversation: builder.mutation<
      {
        success: boolean;
        message: string;
        conversation: {
          _id: string;
          participants: Array<{
            participantId: {
              _id: string;
              firstName: string;
              lastName: string;
              email: string;
              isOnline: boolean;
              lastSeen: string | null;
              profile?: string;
            };
            model: string;
            _id: string;
          }>;
          lastMessage?: any;
          messages: Array<{
            _id: string;
            conversationId: string;
            senderId: string;
            senderModel: string;
            content: string;
            attachments: string[];
            isRead: boolean;
            createdAt: string;
          }>;
          createdAt: string;
          updatedAt: string;
        };
      },
      { recipientId: string }
    >({
      query: body => ({ url: 'conversations?limit=20', method: 'POST', body }),
    }),
    getMessages: builder.query<
      {
        success: boolean;
        message: string;
        total: number;
        page: number;
        totalPages: number;
        messages: Array<{
          _id: string;
          conversationId: string;
          senderId: string;
          senderModel: string;
          content: string;
          attachments: string[];
          isRead: boolean;
          createdAt: string;
        }>;
      },
      { conversationId: string; page: number; limit: number }
    >({
      query: ({ conversationId, page, limit }) => ({
        url: `conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { conversationId }) => [
        { type: 'Messages', id: conversationId },
      ],
    }),
    sendChatMessage: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          _id: string;
          conversationId: string;
          senderId: { _id: string; firstName: string; lastName: string };
          content: string;
          attachments: string[];
          isRead: boolean;
          createdAt: string;
        };
      },
      { conversationId: string; formData: FormData }
    >({
      query: ({ conversationId, formData }) => ({
        url: `conversations/${conversationId}/messages`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useVerifyEmailMutation,
  useGoogleLoginMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUploadCertificatesMutation,
  useDeleteCertificatesMutation,
  useGetRecentActivityQuery,
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useGetOrdersQuery,
  useChangePasswordMutation,
  useGetOrderByIdQuery,
  useScheduleInspectionMutation,
  useSubmitFinalReportMutation,
  useCompleteInspectionMutation,
  useGetTemplatesQuery,
  useGetCommentExamplesQuery,
  useGetChecklistQuery,
  useGetNotesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddChecklistItemMutation,
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
  useGetConversationsQuery,
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendChatMessageMutation,
} = apiSlice;
