import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'
import {SidebarMenuItemWithSub} from "./SidebarMenuItemWithSub.tsx";

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
        <SidebarMenuItem to='/setup/app-users' title='Users' fontIcon='bi-layers' icon='element-7' />
        {/*<SidebarMenuItem to='/setup/courts' title='Courts' fontIcon='bi-layers' icon='element-7' />*/}
        <SidebarMenuItemWithSub
            to=""
            title="Case Setups"
            fontIcon='bi-layers'
            icon='element-1'
        >
            <SidebarMenuItem to='/setup/courts' title='Courts' hasBullet={true} />
            <SidebarMenuItem to='/setup/case-year' title='Years' hasBullet={true} />
            <SidebarMenuItem to='/setup/judgements' title='Judgements' hasBullet={true} />
            <SidebarMenuItem to='/setup/quoroms' title='Quoroms' hasBullet={true} />

        </SidebarMenuItemWithSub>
        <SidebarMenuItem to='/setup/user-devices' title='User Devices' fontIcon='bi-layers' icon='element-7' />
    </>
  )
}

export {SidebarMenuMain}
