import React, { useState, useEffect } from 'react';
import { Lead } from "../hooks/useLeads";
import { SlideOver, Input, Select, Button, Badge } from './ui';

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onUpdateLead: (id: number, updates: Partial<Lead>) => void;
  onConvertToOpportunity: (lead: Lead, amount?: number) => Promise<void>;
  statusOptions: string[];
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LeadDetailPanel({ 
  lead, 
  onClose, 
  onUpdateLead, 
  onConvertToOpportunity,
  statusOptions 
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Partial<Lead>>({});
  const [emailError, setEmailError] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionAmount, setConversionAmount] = useState<string>('');
  const [showConversionForm, setShowConversionForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string>('');

  useEffect(() => {
    if (lead) {
      setEditedLead(lead);
      setIsEditing(false);
      setEmailError('');
      setShowConversionForm(false);
      setConversionAmount('');
      setSaveError('');
    }
  }, [lead]);

  const handleSave = async () => {
    if (editedLead.email && !validateEmail(editedLead.email)) {
      setEmailError('Email inválido');
      return;
    }

    if (lead) {
      setIsSaving(true);
      setSaveError('');
      
      try {
        await onUpdateLead(lead.id, editedLead);
        setIsEditing(false);
        setEmailError('');
      } catch (error) {
        setSaveError('Erro ao salvar. Tente novamente.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCancel = () => {
    if (lead) {
      setEditedLead(lead);
      setIsEditing(false);
      setEmailError('');
      setSaveError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEditedLead({ ...editedLead, email });
    
    if (email && !validateEmail(email)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const handleConvertLead = async () => {
    if (!lead) return;
    
    setIsConverting(true);
    try {
      const amount = conversionAmount ? parseFloat(conversionAmount) : undefined;
      await onConvertToOpportunity(lead, amount);
      setShowConversionForm(false);
      setConversionAmount('');
      onClose();
    } catch (error) {
      console.error('Failed to convert lead:', error);
    } finally {
      setIsConverting(false);
    }
  };

  if (!lead) return null;

  return (
    <SlideOver isOpen={!!lead} onClose={onClose} title="Detalhes do Lead">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{lead.name}</h2>
            <p className="text-sm text-gray-500">{lead.company}</p>
          </div>
          <Badge variant="info" size="lg">
            Score: {lead.score}
          </Badge>
        </div>

        {/* Lead Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <div className="text-gray-900">{lead.name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa
            </label>
            <div className="text-gray-900">{lead.company}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {isEditing ? (
              <Input
                value={editedLead.email || ''}
                onChange={handleEmailChange}
                error={emailError}
                placeholder="email@exemplo.com"
              />
            ) : (
              <div className="text-gray-900">{lead.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            {isEditing ? (
              <Select
                value={editedLead.status || ''}
                onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value })}
                options={statusOptions.map(status => ({ value: status, label: status }))}
              />
            ) : (
              <Badge variant="info">{lead.status}</Badge>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origem
            </label>
            <div className="text-gray-900">{lead.source}</div>
          </div>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{saveError}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={!!emailError || isSaving}
                loading={isSaving}
                className="flex-1"
              >
                Salvar
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1"
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex-1"
              >
                Editar
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowConversionForm(true)}
                className="flex-1"
              >
                Converter Lead
              </Button>
            </>
          )}
        </div>

        {/* Conversion Form */}
        {showConversionForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900">Converter para Oportunidade</h3>
            <Input
              label="Valor (opcional)"
              type="number"
              placeholder="0.00"
              value={conversionAmount}
              onChange={(e) => setConversionAmount(e.target.value)}
              helperText="Deixe em branco se não souber o valor"
            />
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleConvertLead}
                loading={isConverting}
                className="flex-1"
              >
                Converter
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConversionForm(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </SlideOver>
  );
}