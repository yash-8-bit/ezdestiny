import React, { Dispatch, SetStateAction } from 'react'
import { TabsContent } from '../ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox';
import { Plus, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Props {
    value: string;
    keyValuePair: KeyValuePair[];
    setkeyValuePair: Dispatch<SetStateAction<KeyValuePair[]>>;
    onChange: ({ e, id, name }: {
        e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
        id: string,
        name: string;
    }) => void;
    onDelete: (id :string) => void;
    onCheckBoxChange: ({ checkStatus, id }: { checkStatus: boolean, id: string }) => void

}


function MykeyValurPair({ value,onDelete, keyValuePair, setkeyValuePair, onChange, onCheckBoxChange }: Props) {
    return (
        <TabsContent value={value}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {keyValuePair.map((ch) => (
                        <TableRow key={ch.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Checkbox onCheckedChange={(e) => { onCheckBoxChange({ checkStatus: e as boolean, id: ch.id }) }} checked={ch.tick} />
                                    <X onClick={()=> onDelete(ch.id)} size={20} />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Input disabled={!ch.tick} value={ch.key} onChange={(e) => onChange({ e, id: ch.id, name: "key" })} placeholder="Enter Key" />
                            </TableCell>
                            <TableCell>
                                <Input disabled={!ch.tick} value={ch.value} onChange={(e) => onChange({ e, id: ch.id, name: "value" })} placeholder="Enter Value" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={() => setkeyValuePair((f) => [...f, {
                key: "", value: "", tick: true,
                id: crypto.randomUUID()
            }])} className="mt-4" variant="outline" size="sm">
                <Plus />{keyValuePair.length === 0 ? "Add" : "Add More"}
            </Button>
        </TabsContent>

    )
}

export default MykeyValurPair