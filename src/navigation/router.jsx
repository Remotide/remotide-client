import { Navigate, createBrowserRouter } from "react-router-dom";

import {
  GuideForm,
  Guides,
  ManageAdmins,
  PackageForm,
  Packages,
  Skills,
  Stats,
  UsersList,
  VerifyPage,
  AllJobs,
} from "@/pages/admin";

import {
  ViewCompanyProfile,
  EditCompanyProfile,
  DisplayTalent,
  JobForm,
  Jobs,
  LegalCompliance,
  CreateContract,
} from "@/pages/company";

import { ErrorPage } from "@/pages/error";

import {
  ViewTalentProfile,
  EditTalentProfile,
  CreateInvoice,
  CreateWithdrawalMethod,
  WithdrawalMethods,
  Balance,
} from "@/pages/talent";

import { LoginSignup, ForgotPassword, ResetPassword } from "@/pages/auth";

import {
  UpdateUser,
  Contracts,
  ContractOverview,
  InvoiceOverview,
  Invoices,
  Transaction,
  TransactionOverview,
} from "@/pages/shared";

import { Layout } from "@/pages/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/auth" replace /> },
      {
        path: "/auth",
        children: [
          {
            index: true,
            element: <LoginSignup />,
          },
          { path: "forgotPassword", element: <ForgotPassword /> },
          { path: "resetPassword/:token", element: <ResetPassword /> },
        ],
      },
      {
        element: <Layout />,
        children: [
          { path: "updateUser", element: <UpdateUser /> },
          { path: "contracts", element: <Contracts /> },
          { path: "invoices", element: <Invoices /> },
          { path: "transaction", element: <Transaction /> },
          { path: "contract/:contractId", element: <ContractOverview /> },
          { path: "invoice/:invoiceId", element: <InvoiceOverview /> },
          {
            path: "transaction/:transactionId",
            element: <TransactionOverview />,
          },
          {
            path: "company",
            children: [
              {
                index: true,
                element: <Navigate to="/company/profile" replace />,
              },
              { path: "jobs", element: <Jobs /> },
              { path: "job/:jobId?", element: <JobForm /> },
              { path: "profile", element: <ViewCompanyProfile /> },
              { path: "editProfile", element: <EditCompanyProfile /> },
              { path: "legalCompliance", element: <LegalCompliance /> },
              { path: "displayTalent/:id/:title", element: <DisplayTalent /> },
              { path: "createContract", element: <CreateContract /> },
            ],
          },
          {
            path: "talent",
            children: [
              {
                index: true,
                element: <Navigate to="/talent/profile" replace />,
              },
              { path: "profile/:talentId?", element: <ViewTalentProfile /> },
              { path: "editProfile", element: <EditTalentProfile /> },
              { path: "createInvoice", element: <CreateInvoice /> },
              {
                path: "createWithdrawalMethod",
                element: <CreateWithdrawalMethod />,
              },
              {
                path: "withdrawalMethods",
                element: <WithdrawalMethods />,
              },
              {
                path: "balance",
                element: <Balance />,
              },
            ],
          },
          {
            path: "admin",
            children: [
              {
                index: true,
                element: <Navigate to="/admin/verification" replace />,
              },
              { path: "packages", element: <Packages /> },
              { path: "package/:packageId?", element: <PackageForm /> },
              { path: "guides", element: <Guides /> },
              { path: "guide/:guideId?", element: <GuideForm /> },
              { path: "skills", element: <Skills /> },
              { path: "users", element: <UsersList /> },
              { path: "allJobs", element: <AllJobs /> },
              { path: "manageAdmins", element: <ManageAdmins /> },
              { path: "verification", element: <VerifyPage /> },
              { path: "stats", element: <Stats /> },
            ],
          },
        ],
      },
    ],
  },
]);
