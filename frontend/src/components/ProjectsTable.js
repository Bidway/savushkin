import React, { useEffect } from 'react';
import EditableField from './EditableField';
import { useDevicesStore, useInterfacesStore, useProjectsStore, useRangesStore, useSitesStore } from '../stores';

const ProjectsTable = ({ toggleProject, toggleRange }) => {
    const { selectedSite } = useSitesStore();
    const { projects, expandedProjects, handleUpdateProject, loadProjects } = useProjectsStore();
    const { ranges, newRange, expandedRanges, setNewRange, handleUpdateRange, loadRanges } = useRangesStore();
    const { interfaces, newInterface, setNewInterface, handleUpdateInterface, loadInterfaces } = useInterfacesStore();
    const { loadDevices } = useDevicesStore();

    const filteredProjects = projects.filter(project => project.site?.id === Number(selectedSite));

    useEffect(() => { selectedSite && loadProjects() }, [selectedSite]);
    useEffect(() => { expandedProjects.length && loadRanges() }, [expandedProjects]);
    useEffect(() => { expandedRanges.length && (loadInterfaces() || loadDevices()) }, [expandedRanges]);

    const renderEditable = (value, onSave) => (
        <EditableField value={value} onSave={onSave} />
    );

    return (
        <div className="entity-table">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Project (name)</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {filteredProjects.length === 0 ? (
                    <tr><td colSpan="3">No projects found</td></tr>
                ) : filteredProjects.map(project => (
                    <React.Fragment key={project.id}>
                        <tr>
                            <td>
                                <button className="toggle-btn" onClick={() => toggleProject(project.id)}>
                                    {expandedProjects.includes(project.id) ? '-' : '+'}
                                </button>
                            </td>
                            <td>
                                {renderEditable(
                                    project.name,
                                    value => handleUpdateProject(project.id, { ...project, name: value })
                                )}
                            </td>
                            <td>
                                <button className="add-btn" onClick={() => setNewRange({ ...newRange, projectId: project.id })}>
                                    + Add Range
                                </button>
                            </td>
                            <td>
                                <button className="del-btn" onClick={() => setNewRange({ ...newRange, projectId: project.id })}>
                                    + Delete Range
                                </button>
                            </td>
                        </tr>

                        {expandedProjects.includes(project.id) && ranges
                            .filter(range => range.project?.id === project.id)
                            .map(range => (
                                <React.Fragment key={range.id}>
                                    <tr className="range-row">
                                        <td>
                                            <button className="toggle-btn" onClick={() => toggleRange(range.id)}>
                                                {expandedRanges.includes(range.id) ? '-' : '+'}
                                            </button>
                                        </td>
                                        {['name', 'subnetId', 'ip_start', 'ip_end', 'mask', 'gateway'].map(field => (
                                            <td key={field}>
                                                {renderEditable(
                                                    range[field],
                                                    value => handleUpdateRange(range.id, { ...range, [field]: value })
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            <button className="add-btn" onClick={() => setNewInterface({ ...newInterface, rangeId: range.id })}>
                                                + Add Interface
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedRanges.includes(range.id) && interfaces
                                        .filter(intf => intf.range?.id === range.id)
                                        .map(intf => (
                                            <tr key={intf.id} className="interface-row">
                                                <td />
                                                <td>
                                                    {renderEditable(
                                                        intf.name,
                                                        value => handleUpdateInterface(intf.id, { ...intf, name: value })
                                                    )}
                                                </td>
                                                <td>{intf.device?.name}</td>
                                                <td>{intf.device?.location}</td>
                                                <td>
                                                    {renderEditable(
                                                        intf.ip_address,
                                                        value => handleUpdateInterface(intf.id, { ...intf, ip_address: value })
                                                    )}
                                                </td>
                                                <td>
                                                    {renderEditable(
                                                        intf.mac_address,
                                                        value => handleUpdateInterface(intf.id, { ...intf, mac_address: value })
                                                    )}
                                                </td>
                                                <td />
                                            </tr>
                                        ))}
                                </React.Fragment>
                            ))}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsTable;