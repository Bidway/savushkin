import React from 'react';
import { useRangesStore, useInterfacesStore, useProjectsStore, useDevicesStore } from '../stores';
const CreateForms = ({
                     }) => {
    const {
        newRange,
        setNewRange,
        handleCreateRange
    } = useRangesStore()
    const {
        newInterface,
        setNewInterface,
        handleCreateInterface
    } = useInterfacesStore()
    const {
        projects
    } = useProjectsStore()
    const {
        devices,
        newDevice,
        setNewDevice,
        handleCreateDevice
    } = useDevicesStore()
    return (
        <>
            {/* Форма для создания диапазона */}
            {newRange.projectId && (
                <tr className="create-form">
                    <td colSpan="3">
                        <div>
                            <input
                                type="text"
                                value={newRange.name}
                                onChange={(e) => setNewRange({...newRange, name: e.target.value})}
                                placeholder="Range name"
                            />
                            <input
                                type="text"
                                value={newRange.subnetId}
                                onChange={(e) => setNewRange({...newRange, subnetId: e.target.value})}
                                placeholder="IP Start"
                            />
                            <input
                                type="text"
                                value={newRange.ip_start}
                                onChange={(e) => setNewRange({...newRange, ip_start: e.target.value})}
                                placeholder="IP Start"
                            />
                            <input
                                type="text"
                                value={newRange.ip_end}
                                onChange={(e) => setNewRange({...newRange, ip_end: e.target.value})}
                                placeholder="IP End"
                            />
                            <input
                                type="text"
                                value={newRange.mask}
                                onChange={(e) => setNewRange({...newRange, mask: e.target.value})}
                                placeholder="Mask"
                            />
                            <input
                                type="text"
                                value={newRange.gateway}
                                onChange={(e) => setNewRange({...newRange, gateway: e.target.value})}
                                placeholder="Gateway"
                            />
                            <button onClick={handleCreateRange}>Create</button>
                            <button onClick={() => setNewRange({...newRange, projectId: ''})}>Cancel</button>
                        </div>
                    </td>
                </tr>
            )}

            {/* Форма для создания интерфейса */}
            {newInterface.rangeId && (
                <tr className="create-form">
                    <td colSpan="7">
                        <div>
                            <select
                                value={newInterface.deviceId}
                                onChange={(e) => setNewInterface({...newInterface, deviceId: e.target.value})}
                            >
                                <option value="">Select Device</option>
                                {devices.filter(device => device.project.id === 1).map(device => (
                                    <option key={device.id} value={device.id}>{device.name}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={newInterface.name}
                                onChange={(e) => setNewInterface({...newInterface, name: e.target.value})}
                                placeholder="Interface name"
                            />
                            <input
                                type="text"
                                value={newInterface.ip_address}
                                onChange={(e) => setNewInterface({...newInterface, ip_address: e.target.value})}
                                placeholder="IP Address"
                            />
                            <input
                                type="text"
                                value={newInterface.mac_address}
                                onChange={(e) => setNewInterface({...newInterface, mac_address: e.target.value})}
                                placeholder="MAC Address"
                            />
                            <button onClick={handleCreateInterface}>Create</button>
                            <button onClick={() => setNewInterface({...newInterface, rangeId: ''})}>Cancel</button>
                        </div>
                    </td>
                </tr>
            )}

            {/* Форма для создания устройства */}
            {newDevice.projectId && (
                <tr className="create-form">
                    <td colSpan="3">
                        <div>
                            <input
                                type="text"
                                value={newDevice.name}
                                onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                                placeholder="Device name"
                            />
                            <input
                                type="text"
                                value={newDevice.location}
                                onChange={(e) => setNewDevice({...newDevice, location: e.target.value})}
                                placeholder="Device location"
                            />
                            <button onClick={handleCreateDevice}>Add Device</button>
                            <button onClick={() => setNewDevice({...newDevice, projectId: ''})}>Cancel</button>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default CreateForms;