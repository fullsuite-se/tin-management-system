import React from 'react';
import type {TINEntry} from '../../../utils/types.tsx';
import {Button} from '../../ui/button.tsx';
import {MapPin, Edit, Trash2} from 'lucide-react';

interface Props {
    entry: TINEntry,
}

const TableRowMobile: React.FC<Props> = ({ entry }) => {
    return (
        <div id={entry.id}>
            <div>
                <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center text-white font-medium text-xs shadow-lg flex-shrink-0">
                    {entry.registeredName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <span>{entry.registeredName}</span>
                    <div>
                        <span>{entry.tin}</span>
                        <span>{entry.isIndividual ? "Individual" : "Company"}</span>
                        <span>{entry.isForeign ? "Foreign" : "Domestic"}</span>
                    </div>
                    <div>
                        <MapPin />
                        <div>
                            <span>{entry.address1}</span>
                            <span>{entry.address2}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button>
                    <Edit />
                </Button>
                <Button>
                    <Trash2 />
                </Button>
            </div>
        </div>
    )
}

export default TableRowMobile;