import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {ToolbarWrapper} from "../../../_metronic/layout/components/toolbar";
import React from "react";
import {Court} from "./pages/Court.tsx";
import AppUser from "./pages/AppUser.tsx";
import {CaseYear} from "./pages/CaseYear.tsx";
import {Quorom} from "./pages/Quorom.tsx";
import {CaseMonth} from "./pages/CaseMonth.tsx";
import {Judgement} from "./pages/Judgement.tsx";

const widgetsBreadCrumbs: Array<PageLink> = [
    {
        title: 'Setups',
        path: '#',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const SetupPage = () => {
    return(
        <Routes>
            <Route
                element={
                    <>
                        <ToolbarWrapper />
                        <Outlet />
                    </>
                }>
                <Route
                    path='user-devices'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>User Devices</PageTitle>
                            {/*<SageModule />*/}
                        </>
                    }
                />
                <Route
                    path='courts'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Courts</PageTitle>
                            <Court />
                        </>
                    }
                />
                <Route
                    path='quoroms'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Quoroms</PageTitle>
                            <Quorom />
                        </>
                    }
                />
                <Route
                    path='judgements'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Judgements</PageTitle>
                            <Judgement />
                        </>
                    }
                />
                <Route
                    path='case-year'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Years</PageTitle>
                            <CaseYear />
                        </>
                    }
                />
                <Route
                    path='case-month/:id'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>Months</PageTitle>
                            <CaseMonth />
                        </>
                    }
                />
                <Route
                    path='app-users'
                    element={
                        <>
                            <PageTitle breadcrumbs={widgetsBreadCrumbs}>App Users</PageTitle>
                            <AppUser />
                        </>
                    }
                />

                <Route index element={<Navigate to='/setup' />} />
            </Route>
        </Routes>
    )

}

export default SetupPage