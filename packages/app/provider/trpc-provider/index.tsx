import React, { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, TrpcProvider } from 'api/client/index'

export const TRPCProvider = TrpcProvider
