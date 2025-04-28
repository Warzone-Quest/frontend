import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RegistrationModel, tournamentApi, TournamentModel } from '@/api/tournament.api';

interface TournamentDetailsModalProps {
  tournament: TournamentModel;
  isOpen: boolean;
  onClose: () => void;
}

export function TournamentDetailsModal({ tournament, isOpen, onClose }: TournamentDetailsModalProps) {
  const [participants, setParticipants] = useState<RegistrationModel[]>([]);
  useEffect(() => {
    const fetchParticipants = async () => {
      const participants = await tournamentApi.getParticipants(tournament.tournamentId);
      setParticipants(participants);
    };
    fetchParticipants();
  }, [tournament.tournamentId]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-slate-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-slate-700 text-slate-400 hover:text-slate-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white mb-6">
                      {tournament.tournamentName}
                    </Dialog.Title>
                    <div className="mt-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-slate-400">Description</h4>
                          <p className="mt-1 text-white">{tournament.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-400">Start Time</h4>
                          <p className="mt-1 text-white">{new Date(tournament.startsAtTime).toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-400">Entry Fee</h4>
                          <p className="mt-1 text-white">{tournament.entryFee}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-400">Prize Pool</h4>
                          <p className="mt-1 text-white">{tournament.prizePool}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-400">Max Participants</h4>
                          <p className="mt-1 text-white">{tournament.maxParticipantCount}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-400">Status</h4>
                          <p className="mt-1 text-white">{tournament.status}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-slate-400">Rules</h4>
                        <ul className="mt-2 list-disc list-inside text-white space-y-1">
                          <li>{tournament.rules}</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-slate-400">Participants</h4>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {participants?.map((participant) => (
                            <div key={participant.userId} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl">
                              <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                  <span className="text-white font-medium">
                                    {participant.name?.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{participant.name}</p>
                                <p className="text-xs text-slate-400">{participant.email}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 