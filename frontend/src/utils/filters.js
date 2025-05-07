export const filterSite = (data) => ({
    name: data.name
});

export const filterProject = (data) => ({
    id: data.id,
    name: data.name,
    siteId: data.site?.id || data.siteId
});

export const filterDevice = (data) => ({
    id: data.id,
    name: data.name,
    location: data.location,
    projectId: data.project?.id || data.projectId
});

export const filterInterface = (data) => ({
    id: data.id,
    name: data.name,
    ip_address: data.ip_address,
    mac_address: data.mac_address,
    deviceId: data.device?.id || data.deviceId,
    rangeId: data.range?.id || data.rangeId
});

export const filterRange = (data) => ({
    id: data.id,
    name: data.name,
    ip_start: data.ip_start,
    ip_end: data.ip_end,
    mask: data.mask,
    gateway: data.gateway,
    projectId: data.project?.id || data.projectId,
    subnetId: data.subnet?.id || data.subnetId
});

export const filterSubnet = (data) => ({
    id: data.id,
    name: data.name,
    ip_start: data.ip_start,
    ip_end: data.ip_end,
    siteId: data.site?.id || data.siteId
});